import React, {Component} from "react";
import {connect} from "react-redux";
// eslint-disable-next-line
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import Spinner from "reactstrap/es/Spinner.js";
import {db} from "../../firebase";
import * as roles from "../../shared/roles";
import {
  displayDate,
  handleSocialClick,
  isEmpty,
  TODAY,
  updateObject
} from "../../shared/utility";
import * as actions from "../../store/actions";
import Modal from "../UI/Modal";

const BASE_FORM_CONTROLS = {
  id: {
    value: "",
  },
  socialName: {
    value: "",
  },
  fullName: {
    value: "",
  },
  dateRegistered: {
    value: TODAY,
  },
  email: {
    value: "",
  },
  phone: {
    value: "",
  },
  facebook: {
    value: "",
  },
  instagram: {
    value: "",
  },
  twitter: {
    value: "",
  },
};

class Members extends Component {
  state = {
    isEditing: false,
    isEnrollingStudent: false,
    formControls: BASE_FORM_CONTROLS,
    availableClasses: [],
    selectedClassId: undefined,
  };
  
  componentDidMount() {
    this.props.onFetchMembers("", "");
  }
  
  spreadOnForm = formData => {
    let formControls = BASE_FORM_CONTROLS;
    Object.keys(formData).forEach(field => {
      formControls = {
        ...formControls,
        [field]: {
          ...formControls[field],
          value: formData[field],
        },
      };
    });
    this.setState({formControls});
  };
  
  handleStartForm = (id) => {
    const members = this.props.members;
    let focusedMember = BASE_FORM_CONTROLS;
    if (id && !isEmpty(id)) {
      for (let i in members) {
        if (members[i].id === id) focusedMember = members[i];
      }
      this.spreadOnForm(focusedMember);
    }
    else this.handleResetForm();
    
    this.setState({isEditing: true});
  };
  handleCloseModal = () => this.setState({
    isEditing: false,
    isEnrollingStudent: false,
    formControls: BASE_FORM_CONTROLS,
  });
  handleResetForm = () => this.setState({
    formControls: BASE_FORM_CONTROLS,
  });
  
  handleFormElementChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: {
          ...this.state.formControls[name],
          value,
        },
      },
    });
  };
  
  handleSubmitMember = e => {
    e.preventDefault();
    const member = {};
    for (let field in this.state.formControls) member[field] =
      this.state.formControls[field].value;
  
    this.props.onSubmitMember("", member);
    this.handleCloseModal();
    this.handleResetForm();
    alert("Member info submitted");
  };
  
  handleStartEnroll = id => {
    this.setState({isEnrollingStudent: true});
  
    const students = this.props.members;
    let focusedStudent = BASE_FORM_CONTROLS;
  
    if (isEmpty(id)) {
      this.handleResetForm();
      alert("Can't get member's ID to enroll.");
    }
    else {
      for (let i in students) {
        if (students[i].id === id) focusedStudent = students[i];
      }
      this.spreadOnForm(focusedStudent);
    }
  
    this.fetchAvailableClasses();
  };
  
  fetchAvailableClasses = () => {
    db.collection("classes").get()
      .then(res => {
        const fetchedClasses = [];
        res.forEach(doc => {
          let fetchedClass = {...doc.data()};
          fetchedClass = updateObject(fetchedClass, {
            id: doc.id,
            dateFrom: displayDate(fetchedClass.dateFrom.toDate()),
            dateTo: displayDate(fetchedClass.dateTo.toDate())
          });
          fetchedClasses.push(fetchedClass);
          this.setState({
            availableClasses: fetchedClasses,
            selectedClassId: fetchedClasses[0].id,
          });
        });
      })
      .catch(err => console.log(err));
  };
  
  handleSelectedClassChange = e => {
    this.setState({selectedClassId: e.target.value});
  };
  
  handleSubmitEnroll = e => {
    e.preventDefault();
    const classRef = db.collection("classes")
      .doc(this.state.selectedClassId);
    const studentRef = db.collection("members")
      .doc(this.state.formControls.id.value);
    
    db.collection("classEnrollments")
      .add({classRef, studentRef, hasPaid: false})
      .then(res => {
        console.log(res);
        alert("Enrollment info submitted");
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
    
    this.handleCloseModal();
    this.handleResetForm();
  };
  
  render() {
    const {
      isEditing, isEnrollingStudent, formControls,
      availableClasses, selectedClassId
    } = this.state;
    const {isLoading, isAdmin, members} = this.props;
  
    const form_member = (
      <Modal show={isEditing} modalClosed={this.handleCloseModal}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Member Info</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data"
                      className="form-horizontal"
                      onSubmit={this.handleSubmitMember}
                      onReset={this.handleResetForm}>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Member ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">
                        {isEmpty(formControls.id.value)
                         ? "ID UNAVAILABLE. NEW MEMBER."
                         : formControls.id.value}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="fullName-input">Full name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="fullName-input" name="fullName"
                             required
                             value={formControls.fullName.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Enter full name"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="socialName-input">Social name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="socialName-input"
                             name="socialName"
                             required
                             value={formControls.socialName.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Other members will call you
                        by this Social Name"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Date Registered</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="date-input" name="dateRegistered"
                             value={formControls.dateRegistered.value}
                             onChange={this.handleFormElementChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email-input" name="email" required
                             value={formControls.email.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Enter email"
                             autoComplete="email"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="phone-input">Phone number</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="phone-input" name="phone"
                             required
                             value={formControls.phone.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Enter phone number"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="facebook-input">Facebook</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="facebook-input" name="facebook"
                             value={formControls.facebook.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Enter Facebook username"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="instagram-input">Instagram</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="instagram-input" name="instagram"
                             value={formControls.instagram.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Enter Instagram username"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="twitter-input">Twitter</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="twitter-input" name="twitter"
                             value={formControls.twitter.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Enter Twitter username"/>
                    </Col>
                  </FormGroup>
                  <Button size="sm" color="danger"
                          onClick={this.handleCloseModal}>
                    <i className="fa fa-ban"/> Cancel</Button>
                  <Button type="reset" size="sm" color="warning">
                    <i className="fa fa-ban"/> Reset</Button>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"/> Submit</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Modal>
    );
  
    const btn_add_member = <Row>
      <Col col="8" sm="6" md="4" xl className="mb-3 mb-xl-0">
        <Button color="info" className="btn-square"
          onClick={() => this.handleStartForm("")}>
          <i className="fa fa-plus"/> Add a new member
        </Button>
      </Col>
    </Row>;
  
    const rows_members = Object.keys(members).map(mKey => {
      return (
        [
          ...Array(members[mKey]).map(member => {
            const socialMedia = ["facebook", "twitter", "instagram"];
            const socialProfiles = socialMedia.map(medium => {
              if (!isEmpty(member[medium])) {
                return <Button
                  key={medium + mKey}
                  className={"btn-brand mr-1 mb-1 btn-sm btn-" + medium}
                  onClick={() =>
                    handleSocialClick(medium, member[medium])}>
                  <i className={"fa fa-" + medium}/>
                </Button>;
              }
              return null;
            });
            return (
              <tr key={member.id}>
                <td>{member.socialName}</td>
                <td>{member.fullName}</td>
                <td>{member.dateRegistered}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>{socialProfiles}</td>
                <td><Button color="info" className="btn-pill" size="sm" block>
                  Info</Button>
                </td>
                {isAdmin &&
                <td><Button color="success" className="btn-pill" size="sm"
                            onClick={() => this.handleStartEnroll(member.id)}>
                  <i className="fa fa-plus"/></Button></td>}
                {isAdmin &&
                <td><Button color="info" className="btn-pill" size="sm"
                  onClick={() => this.handleStartForm(member.id)}>
                  Edit</Button></td>}
              </tr>
            );
          })
        ]
      );
    });
  
    const options_classes = Object.keys(availableClasses).map(
      cKey => {
        return (
          [
            ...Array(availableClasses[cKey]).map(c => {
              return (<option
                key={c.id}
                value={c.id}>
                {c.className}: {c.dateFrom} to {c.dateTo}
              </option>);
            })
          ]
        );
      });
  
    let tbl_members =
      isLoading
      ? <Spinner/>
      : <Row>
        <Col className="table-responsive-sm">
          <Card>
            <CardHeader>
              List of Members
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                <tr>
                  <th>Social Name</th>
                  <th>Full Name</th>
                  <th>Date Registered</th>
                  <th>Email</th>
                  <th>Phone No.</th>
                  <th>Social Media</th>
                  <th>Payment History</th>
                  {isAdmin && <th>Enroll</th>}
                  {isAdmin && <th>Edit</th>}
                </tr>
                </thead>
                <tbody>
                {rows_members}
                </tbody>
              </Table>
              <Pagination>
                <PaginationItem>
                  <PaginationLink tag="button" previous/>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink
                    tag="button">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    tag="button">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    tag="button">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    tag="button">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button" next/>
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Col>
      </Row>;
  
    const form_enrollStudent = (
      <Modal show={isEnrollingStudent}
             modalClosed={this.handleCloseModal}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Member Info</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data"
                      className="form-horizontal"
                      onSubmit={this.handleSubmitEnroll}
                      onReset={this.handleResetForm}>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Member ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">
                        {isEmpty(formControls.id.value)
                         ? "ID UNAVAILABLE. NEW MEMBER."
                         : formControls.id.value}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="fullName-input">Full name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="fullName-input" name="fullName"
                             required readOnly
                             value={formControls.fullName.value}
                             placeholder="Enter full name"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="socialName-input">Social name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="socialName-input"
                             name="socialName"
                             required readOnly
                             value={this.state.formControls.socialName.value}
                             placeholder="Other members will call you
                        by this Social Name"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="class-select">Select a class</Label>
                    </Col>
                    <Col md="9">
                      <Input type="select"
                             name="class-select" id="class-select"
                             value={selectedClassId}
                             onChange={this.handleSelectedClassChange}>
                        {options_classes}
                      </Input>
                    </Col>
                  </FormGroup>
                  <Button size="sm" color="danger"
                          onClick={this.handleCloseModal}>
                    <i className="fa fa-ban"/> Cancel</Button>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"/> Submit</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Modal>);
    
    return (
      <div>
        {form_member}
        {isAdmin && btn_add_member}
        {tbl_members}
        {form_enrollStudent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.member.isLoading,
    members: state.member.members,
    isAdmin: state.auth.user.role === roles.ADMIN,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMembers: (token, userId) => dispatch(
      actions.fetchMembers(token, userId)),
    onSubmitMember: (token, memberInfo) => dispatch(
      actions.submitMember(token, memberInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
