import React, {Component} from "react";
import {connect} from "react-redux";
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
  Spinner,
  Table,
} from "reactstrap";
import {db} from "../../firebase";
import * as roles from "../../shared/roles";
import {displayDate, updateObject} from "../../shared/utility";
import {isEmpty, TODAY} from "../../shared/utility.js";
import * as actions from "../../store/actions";
import Modal from "../UI/Modal.js";

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

class Teachers extends Component {
  state = {
    isEditing: false,
    isAssigningTeacher: false,
    formControls: BASE_FORM_CONTROLS,
    availableClasses: [],
    selectedClassId: undefined,
  };
  
  componentDidMount() {
    this.props.onFetchTeachers("", "");
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
  
  handleStartEdit = id => {
    const teachers = this.props.teachers;
    let focusedTeacher = BASE_FORM_CONTROLS;
    if (id && !isEmpty(id)) {
      for (let i in teachers) {
        if (teachers[i].id === id) focusedTeacher = teachers[i];
      }
      this.spreadOnForm(focusedTeacher);
    }
    else this.handleResetForm();
    
    this.setState({isEditing: true});
    this.fetchAvailableClasses();
  };
  
  handleCloseModal = () => this.setState({
    isEditing: false,
    isAssigningTeacher: false,
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
  
  handleSubmitTeacher = e => {
    e.preventDefault();
    const teacher = {};
    for (let field in this.state.formControls) teacher[field] =
      this.state.formControls[field].value;
    
    this.props.onSubmitTeacher("", teacher);
    this.handleCloseModal();
    this.handleResetForm();
    alert("Teacher info submitted");
  };
  
  handleStartAssign = id => {
    this.setState({isAssigningTeacher: true});
    
    const teachers = this.props.teachers;
    let focusedTeacher = BASE_FORM_CONTROLS;
    
    if (isEmpty(id)) {
      this.handleResetForm();
      alert("Can't get member's ID to enroll.");
    }
    else {
      for (let i in teachers) {
        if (teachers[i].id === id) focusedTeacher = teachers[i];
      }
      this.spreadOnForm(focusedTeacher);
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
  
  
  handleSubmitAssignment = e => {
    e.preventDefault();
    const classRef = db.collection("classes")
      .doc(this.state.selectedClassId);
    const teacherRef = db.collection("members")
      .doc(this.state.formControls.id.value);
    console.log(teacherRef, classRef);
    
    this.handleCloseModal();
    this.handleResetForm();
    
    db.collection("classAssignments")
      .add({classRef, teacherRef, hasPaid: false})
      .then(res => {
        console.log(res);
        alert("Assignment info submitted");
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };
  
  render() {
    const {
      isEditing, isAssigningTeacher, formControls,
      selectedClassId, availableClasses
    } = this.state;
    const {isLoading, isAdmin, teachers} = this.props;
  
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
                      onSubmit={this.handleSubmitTeacher}
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
  
    const memberRows = Object.keys(teachers).map(mKey => {
      return (
        [
          ...Array(teachers[mKey]).map(teacher => {
            const socialMedia = ["facebook", "twitter", "instagram"];
            const socialProfiles = socialMedia.map(medium => {
              if (!isEmpty(teacher[medium])) {
                return <Button
                  key={medium + mKey}
                  className={"btn-brand mr-1 mb-1 btn-sm btn-" + medium}
                  onClick={() =>
                    this.handleSocialClick(medium, teacher[medium])}>
                  <i className={"fa fa-" + medium}/>
                </Button>;
              }
              return null;
            });
            return (
              <tr key={teacher.id}>
                <td>{teacher.socialName}</td>
                <td>{teacher.fullName}</td>
                <td>{teacher.dateRegistered}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{socialProfiles}</td>
                <td><Button
                  color="info" className="btn-pill" size="sm" block>
                  Info </Button></td>
                {isAdmin && <td><Button
                  color="success" className="btn-pill" size="sm"
                  onClick={() => this.handleStartAssign(teacher.id)}>
                  <i className="fa fa-plus"/> </Button></td>}
                {isAdmin && <td><Button
                  color="info" className="btn-pill" size="sm"
                  onClick={() => this.handleStartEdit(teacher.id)}>
                  Edit</Button></td>}
              </tr>
            );
          })
        ]);
    });
  
    const tb_teachers = isLoading ? <Spinner/> : <Row>
      <Col className="table-responsive-sm">
        <Card>
          <CardHeader>
            List of Teachers
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
                {isAdmin && <th>Assign to class</th>}
                {isAdmin && <th>Edit</th>}
              </tr>
              </thead>
              <tbody>
              {memberRows}
              </tbody>
            </Table>
            <Pagination>
              <PaginationItem>
                <PaginationLink tag="button" previous/>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button" next/>
              </PaginationItem>
            </Pagination>
          </CardBody>
        </Card>
      </Col>
    </Row>;
  
    const options_classes = Object.keys(availableClasses).map(
      cKey => {
        return (
          [
            ...Array(availableClasses[cKey]).map(c => {
              return (<option key={c.id} value={c.id}>
                {c.className}: {c.dateFrom} to {c.dateTo}
              </option>);
            })
          ]
        );
      });
  
    const form_assignTeacher = (
      <Modal
        show={isAssigningTeacher}
        modalClosed={this.handleCloseModal}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Teacher Info</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data"
                      className="form-horizontal"
                      onSubmit={this.handleSubmitAssignment}
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
                             value={formControls.socialName.value}
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
        {tb_teachers}
        {form_assignTeacher}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.member.isLoading,
    teachers: state.member.members,
    isAdmin: state.auth.user.role === roles.ADMIN,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTeachers: (token, userId) => dispatch(
      actions.fetchMembers(token, userId, roles.TEACHER)),
    onSubmitTeacher: (token, teacherInfo) => dispatch(
      actions.submitMember(token, teacherInfo, roles.TEACHER))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
