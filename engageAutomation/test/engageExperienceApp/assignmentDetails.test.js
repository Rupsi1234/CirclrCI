"use strict";
var assignmentListDetailsPage = require('../../pages/engageExperienceApp/assignmentListTeacher.page.js');
var assignmentDetailsPage = require('../../pages/engageExperienceApp/assignmentDetails.page.js');
var createAssignmentPage = require('../../pages/engageExperienceApp/createAssignment.page.js');
const selectActivityPage = require('../../pages/engageExperienceApp/selectActivity.page.js');
var editAssignmentPage = require('../../pages/engageExperienceApp/editAssignment.page.js');
var common = require('./common.test');
var viewAsStudentAssignmentPage = require('../../pages/engageExperienceApp/viewAsStudentAssignment.page.js');
var sts;

module.exports = {

   //Validate the Blank Assignmnt Page
   ENG_ASSDETAILS_TC_1: async function (testdata) {
      sts = await assignmentDetailsPage.getData_assignmentDetails();
      await assertion.assertEqual(sts.assignment_name, testdata[0], "assignment_name is mismatch");
      await assertion.assertEqual(sts.dueDate_lbl, testdata[1].dueDate_lbl, "dueDate_lbl is  mismatch");
      await assertion.assertEqual(sts.studentsTab, testdata[1].studentsTab, "studentsTab is  mismatch");
      await assertion.assertEqual(sts.viewasStudent, testdata[1].viewasStudent, "viewasStudent is mismatch");
      await assertion.assertEqual(sts.allowLateSubmission_lbl, testdata[1].allowLateSubmission_lbl, "allowLateSubmission_lbl is  mismatch");
      await assertion.assertEqual(sts.preventfromSkipping_lbl, testdata[1].preventfromSkipping_lbl, "preventfromSkipping_lbl is  mismatch");
      await assertion.assertEqual(sts.disableShowAnswers_lbl, testdata[1].disableShowAnswers_lbl, "disableShowAnswers_lbl is  mismatch");
      await assertion.assertEqual(sts.includeProgressBar_lbl, testdata[1].includeProgressBar_lbl, "includeProgressBar_lbl is  mismatch");
      //needs to be updated
   },

   ENG_ASSDETAILS_TC_2: async function (testdata) {
      sts = await assignmentDetailsPage.click_viewasStudentmoreoption();
      await assertion.assertEqual(sts.editAssignmentIcon, true, "editAssignmentIcon is mismatch");
      await assertion.assertEqual(sts.editAssignmentlbl, testdata.editAssignmentlbl, "editAssignmentlbl is  mismatch");
      await assertion.assertEqual(sts.cloneAssignmentIcon, true, "cloneAssignmentIcon is  mismatch");
      await assertion.assertEqual(sts.cloneAssignmentlbl, testdata.cloneAssignmentlbl, "cloneAssignmentlbl is  mismatch");
      await assertion.assertEqual(sts.deleteAssignmentIcon, true, "deleteAssignmentIcon is mismatch");
      await assertion.assertEqual(sts.deleteAssignmentlbl, testdata.deleteAssignmentlbl, "deleteAssignmentlbl is  mismatch");
   },
   ENG_ASSDETAILS_TC_3: async function (testdata) {
      sts = await assignmentDetailsPage.click_deleteAssignmentlbl();
      await assertion.assertEqual(sts.deletedialogueHeader, testdata.deletedialogueHeader, "deletedialogueHeader is mismatch");
      await assertion.assertEqual(sts.cancel_btn, testdata.cancel_btn, "cancel_btn is  mismatch");
      await assertion.assertEqual(sts.delete_btn, testdata.delete_btn, "delete_btn is  mismatch");
   },
   ENG_ASSDETAILS_TC_4: async function (testdata) {
      sts = await assignmentListDetailsPage.click_delete_btn();
      await assertion.assertEqual(sts, true, "Delete button status mismatch");
      sts = await common.get_Snackbar_Message_Text();
      await assertion.assertEqual(sts, testdata.deletemsg, "Delete assignment msg status mismatch");
      //assertion.assert(sts.includes("1"), "Snackbar message mismatch: " + sts);
   },
   ENG_ASSDETAILS_TC_5: async function () {
      sts = await assignmentDetailsPage.click_editAssignmentlbl();
      await assertion.assertEqual(sts.pageStatus, true, "Edit Assignment page status mismatch");
   },
   ENG_ASSDETAILS_TC_6: async function (testdata) {
      sts = await editAssignmentPage.set_assignmentName_txtbox(testdata)
      await assertion.assertEqual(sts, true, "Textbox text status mismatch");
   },
   ENG_ASSDETAILS_TC_7: async function (testdata) {
      sts = await editAssignmentPage.click_SaveandClose()
      await assertion.assertEqual(sts.pageStatus, true, "Edit Assignment page status mismatch");
      sts = await common.get_Snackbar_Message_Text();
      await assertion.assertEqual(sts, testdata.editmsg, "Edit assignment msg status mismatch");
   },
   ENG_ASSDETAILS_TC_8: async function () {
      sts = await assignmentDetailsPage.click_cloneAssignmentlbl();
      await assertion.assertEqual(sts.pageStatus, true, "Create Assignment page status mismatch");
   },
   ENG_ASSDETAILS_TC_9: async function (testdata) {
      sts = await editAssignmentPage.set_assignmentName_txtbox(testdata)
      await assertion.assertEqual(sts, true, "Textbox text status mismatch");
   },
   ENG_ASSDETAILS_TC_10: async function (testdata) {
      var name = testdata[0].concat(testdata[1].current);
      sts = await createAssignmentPage.click_classList(testdata[0])
      await assertion.assertEqual(sts, true, "button is not clicked");
   },
   ENG_ASSDETAILS_TC_11: async function () {
      sts = await assignmentDetailsPage.click_viewasStudent()
      await assertion.assertEqual(sts.pageStatus, true, "View As Student page status mismatch");
   },
   ENG_ASSDETAILS_TC_12: async function (testdata) {
      sts = await viewAsStudentAssignmentPage.getData_studentViewPage();
      await assertion.assertEqual(sts.eye_icon, true, "eye_icon is mismatch");
      await assertion.assertEqual(sts.activity_icon, true, "activity_icon is  mismatch");
      await assertion.assertEqual(sts.cancel, true, "cancel is  mismatch");
      await assertion.assertEqual(sts.showDetails_btn, testdata.showDetails_btn, "showDetails_btn is  mismatch");
      //need to add this selector
      //assertion.assertEqual(sts.studentView, testdata.studentView, "studentView is  mismatch");
      await assertion.assertEqual(sts.activity_lbl, testdata.activity_lbl, "activity_lbl is  mismatch");
   },
   ENG_ASSDETAILS_TC_13: async function () {
      sts = await viewAsStudentAssignmentPage.click_cancel();
      await assertion.assertEqual(sts, true, "Cancel button is clicked");
      sts = await require('../../pages/engageExperienceApp/assignmentDetails.page').isInitialized();
      await assertion.assertEqual(sts.pageStatus, true, "assignment Details page status mismatch");
   },
   ENG_ASSDETAILS_TC_14: async function () {
      sts = await editAssignmentPage.click_Cancel()
      await assertion.assertEqual(sts.pageStatus, true, "assignment Details page status mismatch");
   }
}