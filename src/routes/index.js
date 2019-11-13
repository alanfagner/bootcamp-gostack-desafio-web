import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Students from '../pages/Student/List';
import Student from '../pages/Student/Form';

import Profile from '../pages/Profile';

import Plans from '../pages/Plan/List';
import PlanAdd from '../pages/Plan/Add';
import PlanEdit from '../pages/Plan/Edit';

import Enrollments from '../pages/Enrollment/List';
import EnrollmentsAdd from '../pages/Enrollment/Add';
import EnrollmentsEdit from '../pages/Enrollment/Edit';

import Help from '../pages/Help';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student/:id/edit" component={Student} isPrivate />
      <Route path="/student/register" component={Student} isPrivate />
      <Route path="/student" component={Students} isPrivate />

      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/plan/:id/edit" component={PlanEdit} isPrivate />
      <Route path="/plan/register" component={PlanAdd} isPrivate />
      <Route path="/plan" component={Plans} isPrivate />

      <Route
        path="/enrollment/:id/edit"
        component={EnrollmentsEdit}
        isPrivate
      />
      <Route path="/enrollment/register" component={EnrollmentsAdd} isPrivate />
      <Route path="/enrollment" component={Enrollments} isPrivate />

      <Route path="/help" component={Help} isPrivate />
    </Switch>
  );
}
