import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
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
  Row,
  Spinner,
} from "reactstrap";
import {db} from "../../firebase";
import *as roles from "../../shared/roles";
import {updateObject} from "../../shared/utility";
import {handleSocialClick, isEmpty, TODAY} from "../../shared/utility.js";
import * as actions from "../../store/actions";
import Modal from "../UI/Modal.js";

const {SearchBar} = Search;
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
    isFormVisible: false,
    isAttendanceVisible: false,
    formControls: BASE_FORM_CONTROLS,
    classTeachers: [],
    classStudents: [],
  };
  
  componentDidMount() {
    this.props.onFetchClasses("", "");
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
  handleResetForm = () => this.setState({
    formControls: BASE_FORM_CONTROLS,
  });
  
  handleCloseModal = () => this.setState({
    isFormVisible: false,
    isAttendanceVisible: false,
    classTeachers: [],
    classStudents: []
  });
  
  handleStartForm = (id) => {
    const classes = this.props.classes;
    let focusedClass = BASE_FORM_CONTROLS;
    if (id && !isEmpty(id)) {
      for (let i in classes) {
        if (classes[i].id === id) focusedClass = classes[i];
      }
      this.spreadOnForm(focusedClass);
    }
    else this.handleResetForm();
    
    this.setState({isFormVisible: !this.state.isFormVisible});
  };
  
  handleSubmitClass = e => {
    e.preventDefault();
    const classInfo = {};
    for (let field in this.state.formControls) {
      classInfo[field] = this.state.formControls[field].value;
    }
  
    this.props.onSubmitClass("", classInfo);
    this.handleCloseModal();
    this.handleResetForm();
    alert("Class info submitted");
  };
  
  viewClassAttendance = classId => {
    this.setState({isAttendanceVisible: true});
    this.fetchClassStudents(classId);
    this.fetchClassTeachers(classId);
  };
  
  fetchClassStudents = classId => {
    const classRef = db.collection("classes").doc(classId);
  
    db.collection("classEnrollments").where("classRef", "==", classRef).get()
      .then(response => {
        const fetchedStudents = [];
        response.forEach(doc => {
          doc.data().studentRef.get()
            .then(res => {
              const student = updateObject(res.data(), {
                id: res.id,
                hasPaid: doc.data().hasPaid
              });
              fetchedStudents.push(student);
              this.setState({classStudents: fetchedStudents,});
            })
            .catch(e => console.log(e));
        });
      })
      .catch(error => console.log(error));
  };
  fetchClassTeachers = classId => {
    const classRef = db.collection("classes").doc(classId);
  
    db.collection("classAssignments").where("classRef", "==", classRef).get()
      .then(response => {
        const fetchedTeachers = [];
        response.forEach(doc => {
          doc.data().teacherRef.get()
            .then(res => {
              const fetchedTeacher = updateObject(res.data(), {
                id: res.id,
                hasPaid: doc.data().hasPaid
              });
              fetchedTeachers.push(fetchedTeacher);
              this.setState({classTeachers: fetchedTeachers,});
            })
            .catch(e => console.log(e));
        });
      })
      .catch(error => console.log(error));
  };
  
  render() {
    const {
      isFormVisible, isAttendanceVisible, formControls,
      classStudents, classTeachers
    } = this.state;
    const {isLoading, isAdmin, classes} = this.props;
  
    const classColumns = [
      {dataField: "id", text: "Class ID", hidden: true},
      {dataField: "className", text: "Class", sort: true},
      {dataField: "time", text: "Time", sort: true},
      {dataField: "dateFrom", text: "From", sort: true},
      {dataField: "dateTo", text: "To", sort: true},
      {dataField: "description", text: "Description", sort: true},
      {
        dataField: "facebook",
        text: "Facebook",
        formatter: (cell) => isEmpty(cell) ? null : <Button
          className="btn-brand mr-1 mb-1 btn-sm btn-facebook"
          onClick={() => handleSocialClick("facebook", cell)}>
          <i className="fa fa-facebook"/></Button>
      },
      {
        dataField: "attendance", text: "Attendance",
        formatter: (cell, row) =>
          <Button
            color="info" className="btn-pill" size="sm" block
            onClick={() => this.viewClassAttendance(row.id)}>
            View
          </Button>
      },
      {
        dataField: "edit", text: "Edit", hidden: !isAdmin,
        formatter: (cell, row) => <Button
          color="info" className="btn-pill" size="sm"
          onClick={() => this.handleStartForm(row.id)}>
          Edit</Button>
      }
    ];
  
    const attendanceColumns = [
      {dataField: "id", text: "Teacher ID", hidden: true},
      {dataField: "index", text: "#", formatter: (c, r, rIndex) => rIndex},
      {dataField: "socialName", text: "Social name"},
      {dataField: "fullName", text: "Full name"},
      {dataField: "phone", text: "Phone"},
      {dataField: "email", text: "Email"},
      {
        dataField: "hasPaid", text: "Payment status",
        formatter: hasPaid => hasPaid
          ? <Badge className="mr-1" color="success" pill>Paid</Badge>
          : <Badge className="mr-1" color="warning" pill>Pending</Badge>
      },
    ];
  
    const btn_addClass =
      <Row> <Col col="8" sm="6" md="4" xl className="mb-3 mb-xl-0">
        <Button
          color="info"
          className="btn-square"
          onClick={() => this.handleStartForm("")}>
          <i className="fa fa-plus"/>
          Add a new class
        </Button>
      </Col></Row>;
  
    const tbl_classes = isLoading ? <Spinner/> :
      <ToolkitProvider
        search
        keyField="id"
        data={classes}
        columns={classColumns}
      >{props => (
        <Row> <Col className="table-responsive-sm"> <Card>
          <CardHeader><SearchBar {...props.searchProps}/></CardHeader>
          <CardBody>
            <BootstrapTable
              {...props.baseProps}
              striped hover condensed bordered={false}
              noDataIndication="Table is Empty"
              pagination={paginationFactory()}
              defaultSorted={[{dataField: "dateFrom", order: "desc"}]}/>
          </CardBody>
        </Card></Col></Row>)}
      </ToolkitProvider>
    ;
  
    const tbl_classTeachers =
      <Row> <Col className="table-responsive-sm">
        <Card>
          <CardHeader>Teachers</CardHeader>
          <CardBody> <BootstrapTable
            striped hover condensed bordered={false}
            keyField="id" data={classTeachers} columns={attendanceColumns}
            noDataIndication="Table is Empty"/></CardBody>
        </Card>
      </Col></Row>;
  
    const tbl_classStudents =
      <Row> <Col className="table-responsive-sm">
        <Card>
          <CardHeader>Students</CardHeader>
          <CardBody> <BootstrapTable
            striped hover condensed bordered={false}
            keyField="id" data={classStudents} columns={attendanceColumns}
            noDataIndication="Table is Empty"/>
          </CardBody>
        </Card>
      </Col></Row>;
  
    const form_class = <Row> <Col> <Card>
      <CardHeader><strong>Class Info</strong></CardHeader>
      <CardBody>
        <Form
          action="" method="post" encType="multipart/form-data"
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
    </Card></Col></Row>;
  
  
    return (
      <div>
        {this.props.isAdmin && btn_addClass}
        {tbl_classes}
      
        <Modal show={isAttendanceVisible} modalClosed={this.handleCloseModal}>
          {tbl_classTeachers}
          {tbl_classStudents}
        </Modal>
      
        <Modal show={isFormVisible} modalClosed={this.handleCloseModal}>
          <CardBody>{form_class}</CardBody>
        </Modal>
      </div>
    );
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
