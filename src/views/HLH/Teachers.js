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
  Table,
} from "reactstrap";
import axios from "../../shared/axios-hlh.js";
import {isNotEmpty, TODAY} from "../../shared/utility.js";
import * as actions from "../../store/actions";
import Modal from "../UI/Modal.js";

const BASE_FORM_CONTROLS = {
  id            : {
    value: "",
  },
  socialName    : {
    value: "",
  },
  fullName      : {
    value: "",
  },
  dateRegistered: {
    value: TODAY,
  },
  email         : {
    value: "",
  },
  phone         : {
    value: "",
  },
  facebook      : {
    value: "",
  },
  instagram     : {
    value: "",
  },
  twitter       : {
    value: "",
  },
};

class Teachers extends Component {
  state = {
    isEditing         : false,
    isAssigningTeacher: false,
    formControls      : BASE_FORM_CONTROLS,
    availableClasses  : [],
    selectedClassId   : undefined,
  };
  
  componentDidMount() {
    this.props.onFetchTeachers("", "", "teacher");
  }
  
  spreadOnForm      = formData => {
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
  clearModalHandler = () => this.setState({
    isEditing         : false,
    isAssigningTeacher: false,
    formControls      : BASE_FORM_CONTROLS,
  });
  resetFormHandler  = () => this.setState({
    formControls: BASE_FORM_CONTROLS,
  });
  
  
  handleStartAssign = id => {
    const teachers     = this.props.members;
    let focusedTeacher = BASE_FORM_CONTROLS;
    if (id && isNotEmpty(id)) {
      for (let i in teachers) {
        if (teachers[i].id === id) focusedTeacher = teachers[i];
      }
      this.spreadOnForm(focusedTeacher);
    } else this.resetFormHandler();
    
    this.setState({isAssigningTeacher: true});
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
          selectedClassId : fetchedClasses[0].id,
        });
      })
      .catch(err => console.log(err));
  };
  
  handleSubmitAssignment = e => {
    e.preventDefault();
    const classId   = this.state.selectedClassId;
    const teacherId = this.state.formControls.id.value;
    console.log(teacherId, classId);
    
    this.clearModalHandler();
    this.resetFormHandler();
    
    axios.put("/classAssignments/" + classId + "/" + teacherId + ".json",
      {isAssigned: true, hasPaid: false})
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
    const memberRows = Object.keys(this.props.members).map(mKey => {
      return (
        [...Array(this.props.members[mKey]).map(member => {
          const socialMedia    = ["facebook", "twitter", "instagram"];
          const socialProfiles = socialMedia.map(medium => {
            if (isNotEmpty(member[medium])) {
              return <Button
                key={medium + mKey}
                className={"btn-brand mr-1 mb-1 btn-sm btn-" + medium}
                onClick={() =>
                  this.socialClickedHandler(medium, member[medium])}>
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
              <td><Button
                color="info" className="btn-pill" size="sm" block>
                Info </Button></td>
              {this.props.isAdmin && <td><Button
                color="success" className="btn-pill" size="sm"
                onClick={() => this.handleStartAssign(member.id)}>
                <i className="fa fa-plus"/> </Button></td>}
              {this.props.isAdmin && <td><Button
                color="info" className="btn-pill" size="sm"
                onClick={() => this.formToggleHandler(member.id)}>
                Edit</Button></td>}
            </tr>
          );
        })]);
    });
    
    const tb_teachers = <Row>
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
                {this.props.isAdmin && <th>Assign to class</th>}
                {this.props.isAdmin && <th>Edit</th>}
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
    
    const options_classes = Object.keys(this.state.availableClasses).map(cKey => {
      return (
        [...Array(this.state.availableClasses[cKey]).map(c => {
          return (<option
            key={c.id}
            value={c.id}>
            {c.className}: {c.dateFrom} to {c.dateTo}
          </option>);
        })]
      );
    });
    
    const form_assignTeacher = (
      <Modal
        show={this.state.isAssigningTeacher}
        modalClosed={this.clearModalHandler}>
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
                      onReset={this.resetFormHandler}>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Member ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">
                        {isNotEmpty(this.state.formControls.id.value)
                          ? this.state.formControls.id.value
                          : "ID UNAVAILABLE. NEW MEMBER."}</p>
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
        {tb_teachers}
        {form_assignTeacher}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    members: state.member.members,
    isAdmin: state.auth.user.displayName === "admin",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTeachers: (token, userId, role) => dispatch(
      actions.fetchMembers(token, userId, role)),
    onEditMember   : (token, memberInfo) => dispatch(
      actions.updateMember(token, memberInfo),
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
