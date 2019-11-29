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
import axios from "../../shared/axios-hlh.js";
import {isEmpty, socialClickedHandler, TODAY} from "../../shared/utility";
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
    editing: false,
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
  
  editingStartHandler = (id) => {
    const members = this.props.members;
    let focusedMember = BASE_FORM_CONTROLS;
    if (id && !isEmpty(id)) {
      for (let i in members) {
        if (members[i].id === id) focusedMember = members[i];
      }
      this.spreadOnForm(focusedMember);
    }
    else this.resetFormHandler();
  
    this.setState({isEditing: true});
  };
  clearModalHandler = () => this.setState({
    isEditing: false,
    isEnrollingStudent: false,
    formControls: BASE_FORM_CONTROLS,
  });
  resetFormHandler = () => this.setState({
    formControls: BASE_FORM_CONTROLS,
  });
  
  formElementChangeHandler = e => {
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
  
  handleSelectedClassChange = e => {
    this.setState({selectedClassId: e.target.value});
  };
  
  submitMemberHandler = e => {
    e.preventDefault();
    const member = {};
    for (let field in this.state.formControls) {
      member[field] = this.state.formControls[field].value;
    }
    
    // Decision: Create new or Edit existing member
    if (!isEmpty(member.id)) {
      this.props.onEditMember("", member);
    }
    else {
      delete member.id;
      this.props.onAddMember("", member);
    }
    
    this.clearModalHandler();
    this.resetFormHandler();
    alert("Member info submitted");
  };
  
  startEnrollHandler = id => {
    const student = this.props.members;
    let focusedStudent = BASE_FORM_CONTROLS;
    if (id && !isEmpty(id)) {
      for (let i in student) {
        if (student[i].id === id) focusedStudent = student[i];
      }
      this.spreadOnForm(focusedStudent);
    }
    else this.resetFormHandler();
    
    this.setState({isEnrollingStudent: true});
    this.fetchAvailableClasses();
  };
  
  fetchAvailableClasses = () => {
    axios.get("/classes.json")
      .then(res => {
        const fetchedClasses = [];
        for (let key in res.data) {
          fetchedClasses.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({
          availableClasses: fetchedClasses,
          selectedClassId: fetchedClasses[0].id,
        });
      })
      .catch(err => console.log(err));
  };
  
  submitEnrollHandler = e => {
    e.preventDefault();
    const classId = this.state.selectedClassId;
    const studentId = this.state.formControls.id.value;
    console.log(studentId, classId);
    
    this.clearModalHandler();
    this.resetFormHandler();
    
    axios.put("/classEnrollments/" + classId + "/" + studentId + ".json",
      {isEnrolled: true, hasPaid: false})
      .then(res => {
        console.log(res);
        alert("Enrollment info submitted");
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };
  
  render() {
    const form_member = (
      <Modal show={this.state.editing} modalClosed={this.clearModalHandler}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Member Info</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data"
                      className="form-horizontal"
                      onSubmit={this.submitMemberHandler}
                      onReset={this.resetFormHandler}>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Member ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">
                        {isEmpty(this.state.formControls.id.value)
                         ? "ID UNAVAILABLE. NEW MEMBER."
                         : this.state.formControls.id.value}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="fullName-input">Full name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="fullName-input" name="fullName"
                             required
                             value={this.state.formControls.fullName.value}
                             onChange={this.formElementChangeHandler}
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
                             value={this.state.formControls.socialName.value}
                             onChange={this.formElementChangeHandler}
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
                             value={this.state.formControls.dateRegistered.value}
                             onChange={this.formElementChangeHandler}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email-input" name="email" required
                             value={this.state.formControls.email.value}
                             onChange={this.formElementChangeHandler}
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
                             value={this.state.formControls.phone.value}
                             onChange={this.formElementChangeHandler}
                             placeholder="Enter phone number"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="facebook-input">Facebook</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="facebook-input" name="facebook"
                             value={this.state.formControls.facebook.value}
                             onChange={this.formElementChangeHandler}
                             placeholder="Enter Facebook username"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="instagram-input">Instagram</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="instagram-input" name="instagram"
                             value={this.state.formControls.instagram.value}
                             onChange={this.formElementChangeHandler}
                             placeholder="Enter Instagram username"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="twitter-input">Twitter</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="twitter-input" name="twitter"
                             value={this.state.formControls.twitter.value}
                             onChange={this.formElementChangeHandler}
                             placeholder="Enter Twitter username"/>
                    </Col>
                  </FormGroup>
                  <Button size="sm" color="danger"
                          onClick={this.clearModalHandler}>
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
                onClick={() => this.editingStartHandler("")}>
          <i className="fa fa-plus"/> Add a new member
        </Button>
      </Col>
    </Row>;
    
    const rows_members = Object.keys(this.props.members).map(mKey => {
      return (
        [
          ...Array(this.props.members[mKey]).map(member => {
            const socialMedia = ["facebook", "twitter", "instagram"];
            const socialProfiles = socialMedia.map(medium => {
              if (!isEmpty(member[medium])) {
                return <Button
                  key={medium + mKey}
                  className={"btn-brand mr-1 mb-1 btn-sm btn-" + medium}
                  onClick={() =>
                    socialClickedHandler(medium, member[medium])}>
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
                {this.props.isAdmin &&
                <td><Button color="success" className="btn-pill" size="sm"
                            onClick={() => this.startEnrollHandler(member.id)}>
                  <i className="fa fa-plus"/></Button></td>}
                {this.props.isAdmin &&
                <td><Button color="info" className="btn-pill" size="sm"
                            onClick={() => this.editingStartHandler(member.id)}>
                  Edit</Button></td>}
              </tr>
            );
          })
        ]
      );
    });
  
    const options_classes = Object.keys(this.state.availableClasses).map(
      cKey => {
        return (
          [
            ...Array(this.state.availableClasses[cKey]).map(c => {
              return (<option
                key={c.id}
                value={c.id}>
                {c.className}: {c.dateFrom} to {c.dateTo}
              </option>);
            })
          ]
        );
      });
  
    let tbl_members = this.props.isLoading
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
                                  {this.props.isAdmin && <th>Enroll</th>}
                                  {this.props.isAdmin && <th>Edit</th>}
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
      <Modal show={this.state.isEnrollingStudent}
             modalClosed={this.clearModalHandler}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Member Info</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data"
                      className="form-horizontal"
                      onSubmit={this.submitEnrollHandler}
                      onReset={this.resetFormHandler}>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Member ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">
                        {isEmpty(this.state.formControls.id.value)
                         ? "ID UNAVAILABLE. NEW MEMBER."
                         : this.state.formControls.id.value}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="fullName-input">Full name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="fullName-input" name="fullName"
                             required readOnly
                             value={this.state.formControls.fullName.value}
                        // onChange={this.formElementChangeHandler}
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
                        // onChange={this.formElementChangeHandler}
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
                             value={this.state.selectedClassId}
                             onChange={this.handleSelectedClassChange}>
                        {options_classes}
                      </Input>
                    </Col>
                  </FormGroup>
                  <Button size="sm" color="danger"
                          onClick={this.clearModalHandler}>
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
        {this.props.isAdmin && btn_add_member}
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
    isAdmin: state.auth.user.displayName === "admin",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMembers: (token, userId) => dispatch(
      actions.fetchMembers(token, userId)),
    onAddMember: (token, memberInfo) => dispatch(
      actions.createMember(token, memberInfo)),
    onEditMember: (token, memberInfo) => dispatch(
      actions.updateMember(token, memberInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
