import {
  AppAside,
  AppBreadcrumb2 as AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
import React, {Component, Suspense} from "react";
import {connect} from "react-redux";
import * as router from "react-router-dom";
import {Redirect, Route, Switch} from "react-router-dom";
import {Container} from "reactstrap";
// sidebar nav config
// import {navigation} from "../../_nav";
// routes config
import routes from "../../routes";
import * as roles from "../../shared/roles";
import * as actions from "../../store/actions";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  componentDidMount() {
    this.props.onVerifyUser(() => this.props.history.push("/login"));
  }
  
  loading = () => <div
    className="animated fadeIn pt-1 text-center">Loading...</div>;
  
  signOut(e) {
    e.preventDefault();
    this.props.onLogout(() => this.props.history.push("/login"));
  }
  
  render() {
    const {isAdmin, isTeacher} = this.props;
    
    // Check src/_nav to see default Layout
    const navigation = {
      items: [
        {
          title: true,
          name: "Hanoi Lindy Hop",
        },
        {
          name: "About Us",
          url: "/about-us",
          icon: "icon-home",
        },
        {
          name: "Classes",
          url: "/classes",
          icon: "icon-calendar",
        },
        {
          name: "Members",
          url: "/members",
          icon: "icon-people",
        },
        {
          name: "Teachers",
          url: "/teachers",
          icon: "icon-user",
        },
        {
          name: "Documents",
          url: "/documents",
          icon: "fa fa-files-o",
          attributes: {hidden: !(isAdmin || isTeacher)}
        },
        {
          name: "Finance",
          url: "/finance",
          icon: "fa fa-money",
          attributes: {hidden: !isAdmin},
        },
      ],
    };
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props}
                router={router}/>
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => {
                          if (route.requireAdmin && !isAdmin)
                            return <Redirect to="/about-us"/>;
                          if (route.requireTeacher && !(isAdmin || isTeacher))
                            return <Redirect to="/about-us"/>;
                          return (
                            <route.component {...props} />
                          );
                        }
                        }/>
                    ) : null;
                  })}
                  <Redirect from="/" to="/classes"/>
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside/>
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.auth.user.role === roles.ADMIN,
    isTeacher: state.auth.user.role === roles.TEACHER,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onVerifyUser: (callback) => dispatch(
      actions.verifyAuth(callback),
    ),
    onLogout: (callback) => dispatch(
      actions.logoutUser(callback),
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);

