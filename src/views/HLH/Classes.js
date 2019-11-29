import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Badge,
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
import axios from "../../shared/axios-hlh.js";
import *as roles from "../../shared/roles";
import {handleSocialClick, isEmpty, TODAY} from "../../shared/utility.js";
import * as actions from "../../store/actions";
import Modal from "../UI/Modal.js";

const BASE_FORM_CONTROLS = {
  id: {
    value: "",
  },
  className: {
    value: "",
  },
  dateFrom: {
    value: TODAY,
  },
  dateTo: {
    value: TODAY,
  },
  time: {
    value: "",
  },
  description: {
    value: "",
  },
  facebook: {
    value: "",
  },
};

class Classes extends Component {
  state = {
    isEditing: false,
    isAttendanceVisible: false,
    formControls: BASE_FORM_CONTROLS,
    classTeachers: [],
    classStudents: [],
  };
  
  componentDidMount() {
    this.props.onFetchClasses("", "");
    // console.log("Classes state", this.props.classes);
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
  
  
  handleCloseModal = () => this.setState({
    isEditing: false,
    isAttendanceVisible: false,
  });
  handleResetForm = () => this.setState({
    formControls: BASE_FORM_CONTROLS,
  });
  handleFormToggle = (id) => {
    const classes = this.props.classes;
    let focusedClass = BASE_FORM_CONTROLS;
    if (id && !isEmpty(id)) {
      for (let i in classes) {
        if (classes[i].id === id) focusedClass = classes[i];
      }
      this.spreadOnForm(focusedClass);
    }
    else this.handleResetForm();
    
    this.setState({isEditing: !this.state.isEditing});
  };
  
  handleSubmitClass = e => {
    e.preventDefault();
    const classInfo = {};
    for (let field in this.state.formControls) {
      classInfo[field] = this.state.formControls[field].value;
    }
  
    // Decision: Create New or Edit Existing member
    this.props.onSubmitClass("", classInfo);
    // if (!isEmpty(classInfo.id)) this.props.onEditClass("", classInfo);
    // else this.props.onAddClass("", classInfo);
  
    this.handleCloseModal();
    this.handleResetForm();
    alert("Class info submitted");
  };
  
  viewClassAttendance = classId => {
    this.fetchClassStudents(classId);
    this.fetchClassTeachers(classId);
  };
  
  fetchClassStudents = classId => {
    axios.get("/classEnrollments/" + classId + ".json")
      .then(res => {
        const fetchedStudents = [];
        for (let key in res.data) {
          if (res.data[key].isEnrolled) {
            let student = {id: key, ...res.data[key]};
            axios.get("/members/" + key + ".json")
              .then(res => {
                student = {...student, ...res.data};
                fetchedStudents.push(student);
                this.setState({
                  classStudents: fetchedStudents,
                  isAttendanceVisible: true,
                });
                
              }).catch(e => console.log(e));
          }
        }
      })
      .catch(err => console.log(err));
  };
  fetchClassTeachers = classId => {
    axios.get("/classAssignments/" + classId + ".json")
      .then(res => {
        const fetchedTeachers = [];
        for (let key in res.data) {
          if (res.data[key].isAssigned) {
            let teacher = {id: key, ...res.data[key]};
            axios.get("/members/" + key + ".json")
              .then(res => {
                teacher = {...teacher, ...res.data};
                fetchedTeachers.push(teacher);
                this.setState({
                  classTeachers: fetchedTeachers,
                  isAttendanceVisible: true,
                });
              }).catch(err => console.log(err));
          }
        }
      })
      .catch(err => console.log(err));
  };
  
  render() {
    const {isEditing, isAttendanceVisible, formControls, classStudents, classTeachers} = this.state;
    const {isLoading, isAdmin, classes} = this.props;
  
    const form_class = (
      <Modal show={isEditing} modalClosed={this.handleCloseModal}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Class Info</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data"
                      className="form-horizontal"
                      onSubmit={this.handleSubmitClass}
                      onReset={this.handleResetForm}>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Class ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">
                        {isEmpty(formControls.id.value)
                         ? "ID UNAVAILABLE. NEW CLASS."
                         : formControls.id.value}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="className-input">Class Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="className-input" name="className"
                             required
                             value={formControls.className.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Enter full name"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="dateFrom-input">From</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="dateFrom-input"
                             name="dateFrom"
                             required
                             value={formControls.dateFrom.value}
                             onChange={this.handleFormElementChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="dateTo-input">To</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="dateTo-input" name="dateTo"
                             value={formControls.dateTo.value}
                             onChange={this.handleFormElementChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="time-input">Weekly schedule</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="time-input" name="time" required
                             value={formControls.time.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Enter the weekly
                             time slot for this class"
                      />
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description-input">Textarea</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="description"
                             id="description-input" rows="9"
                             value={formControls.description.value}
                             onChange={this.handleFormElementChange}
                             placeholder="Description about the class..."/>
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
                             placeholder="Enter Facebook event link"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Button size="sm" color="danger"
                            onClick={this.handleCloseModal}>
                      <i className="fa fa-ban"/> Cancel</Button>
                    <Button type="reset" size="sm" color="warning">
                      <i className="fa fa-ban"/> Reset</Button>
                    <Button type="submit" size="sm" color="primary">
                      <i className="fa fa-dot-circle-o"/> Submit</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Modal>
    );
  
    const btn_addClass = <Row>
      <Col col="8" sm="6" md="4" xl className="mb-3 mb-xl-0">
        <Button color="info" className="btn-square"
                onClick={() => this.handleFormToggle("")}>
          <i className="fa fa-plus"/> Add a new class
        </Button>
      </Col>
    </Row>;
  
    const rows_classes = Object.keys(classes).map(cKey => {
      return ([
        ...Array(classes[cKey]).map(c => {
          return (<tr key={c.id}>
            <td>{c.className}</td>
            <td>{c.time}</td>
            <td>{c.dateFrom}</td>
            <td>{c.dateTo}</td>
            <td>{c.description}</td>
            <td><Button
              className={"btn-brand mr-1 mb-1 btn-sm btn-facebook"}
              onClick={() =>
                handleSocialClick("facebook", c.facebook)}>
              <i className={"fa fa-facebook"}/>
            </Button></td>
            <td><Button color="info" className="btn-pill" size="sm" block
                        onClick={() => this.viewClassAttendance(c.id)}>
              View</Button></td>
            {isAdmin &&
            <td><Button color="info" className="btn-pill" size="sm"
                        onClick={() => this.handleFormToggle(c.id)}>
              Edit</Button></td>}
          </tr>);
        })
      ]);
    });
  
    const rows_students = Object.keys(classStudents).map(sKey => {
      return ([
          ...Array(classStudents[sKey]).map(s => {
            return (<tr key={s.id}>
              <td>{parseInt(sKey) + 1}</td>
              <td>{s.socialName}</td>
              <td>{s.fullName}</td>
              <td>{s.phone}</td>
              <td>{s.email}</td>
              <td>{s.hasPaid
                   ? <Badge className="mr-1" color="success" pill>Paid</Badge>
                   : <Badge className="mr-1" color="warning"
                            pill>Pending</Badge>}
              </td>
            </tr>);
          })
        ]
      );
    });
  
    const rows_teachers = Object.keys(classTeachers).map(tKey => {
      return ([
          ...Array(classTeachers[tKey]).map(t => {
            return (<tr key={t.id}>
              <td>{parseInt(tKey) + 1}</td>
              <td>{t.socialName}</td>
              <td>{t.fullName}</td>
              <td>{t.phone}</td>
              <td>{t.email}</td>
              <td>{t.hasPaid
                   ? <Badge className="mr-1" color="success" pill>
                     Paid</Badge>
                   : <Badge className="mr-1" color="warning" pill>
                     Pending</Badge>}
              </td>
            </tr>);
          })
        ]
      );
    });
  
    const tbl_classes =
      isLoading
      ? <Spinner/>
      : <Row>
        <Col className="table-responsive-sm">
          <Card>
            <CardHeader>
              List of Classes
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                <tr>
                  <th>Class name</th>
                  <th>Time</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Description</th>
                  <th>Facebook</th>
                  <th>Attendance</th>
                  {isAdmin && <th>Edit</th>}
                </tr>
                </thead>
                <tbody>
                {rows_classes}
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
  
    const tbl_classAttendance = (
      <Modal show={isAttendanceVisible}
             modalClosed={this.handleCloseModal}>
        <Row>
          <Col className="table-responsive-sm">
            <Card>
              <CardHeader>
                Teachers
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Index</th>
                    <th>Social name</th>
                    <th>Full name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Payment status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {rows_teachers}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="table-responsive-sm">
            <Card>
              <CardHeader>
                Students
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Index</th>
                    <th>Social name</th>
                    <th>Full name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Payment status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {rows_students}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Modal>);
    
    return (<div>
      {form_class}
      {this.props.isAdmin && btn_addClass}
      {tbl_classes}
      {tbl_classAttendance}
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.class.isLoading,
    classes: state.class.classes,
    isAdmin: state.auth.user.role === roles.ADMIN,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchClasses: (token, userId) => dispatch(
      actions.fetchClasses(token, userId)),
    onSubmitClass: (token, classInfo) => dispatch(
      actions.submitClass(token, classInfo))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Classes);
