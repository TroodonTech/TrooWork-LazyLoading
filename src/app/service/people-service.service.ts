import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConectionSettings } from './ConnectionSetting';

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {

  constructor(private http: HttpClient) { }

  getLoginCredentialList(pageNo, itemsPerPage, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getLoginDetailsForAllUsers?pageno=' + pageNo + '&itemsperpage=' + itemsPerPage + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getLoginDetailsByEmpKey(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getLoginDetailsByID?employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  resetUserPassword(username, password, empKey, userLoginId, updatedUser, OrgID) {
    const url = ConectionSettings.Url+"/resetPassword";
    const obj = {
      username: username,
      password: password,
      employeekey: empKey,
      updatedBy: updatedUser,
      userloginid: userLoginId,
      OrganizationID: OrgID
    };

    return this.http.post(url, obj);
  }

  getUserEmail(username, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getUserEmail?username=' + username + '&empkey=' + empKey + '&OrganizationID=' + OrgID);

  }


  getJobTitleList(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/selectJobtitle?empkey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getallEmployeesList(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/allemployees?empkey=' + empKey + '&OrganizationID=' + OrgID);

  }

  gettodaysMeeting(page, count, today, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/gettodaysMeeting?ondate=' + today + '&employeekey=' + empKey + '&pageno=' + page + '&itemsPerPage=' + count + '&OrganizationID=' + OrgID);

  }

  viewMtngTrainingbyFilter(fromDate, toDate, JobList, EmpList, empKey, OrgID,DepartmentKey,EventType) {

    const url = ConectionSettings.Url+"/viewMeettingTrainingByAllFilter";
    const obj = {
      empKey: empKey,
      search_DT: fromDate,
      search_DT2: toDate,
      employees: EmpList,
      jobs: JobList,
      OrganizationID: OrgID,
      DeptKey:DepartmentKey,
      Evntype:EventType
    };
    return this.http.post(url, obj);
  }


  SearchmeetingTraining(fromDate, toDate, JobList, EmpList, SearchValue, empKey, OrgID) {

    const url = ConectionSettings.Url+"/searchMeetingEventView";
    const obj = {
      empKey: empKey,
      search_DT: fromDate,
      search_DT2: toDate,
      employees: EmpList,
      jobs: JobList,
      searchMeeting: SearchValue,
      OrganizationID: OrgID
    };
    return this.http.post(url, obj);
  }

  viewEmployeesOfEvent(eventKey, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/viewEmployeesOfEvent?EventKey=' + eventKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  markAttendance(empKey, eventKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/submitMarkAsAttendedTraining?EventKey=' + eventKey + '&attendedEmployees=' + empKey + '&OrganizationID=' + OrgID);

  }


  removeAttendance(empKey, eventKey, OrgID) {

    const url = ConectionSettings.Url+"/unAttendedTrainingChangeStatus?EventKey=" + eventKey + "&employeekey=" + empKey + "&OrganizationID=" + OrgID;
    const obj = {};
    return this.http.post(url, obj);
  }


  DeleteMeetingTraining(eventKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/deleteMeetingViewEmployeeDetails?EventKey=' + eventKey + '&OrganizationID=' + OrgID);

  }


  getSupervisorList(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/supervisorname?employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }
  getallEventList(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/meetingTraining?empKey=' + empKey + '&OrganizationID=' + OrgID);

  }
  getSupervisorEmployeesList(supervisorKey, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/empGetBySupervisor?SupervisorKey=' + supervisorKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getJobtitleEmployeesList(jobTleKey, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/empKey_byJobtitle?jobTitle=' + jobTleKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getSupervisorJobtitleEmployeesList(jobTleKey, superVsrKey, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/empGetBySupervisorjobTitle?SupervisorKey=' + superVsrKey + '&JobTitleKey=' + jobTleKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  addMeetingTraining(EventType, eventHost, Venue, time1, time2, Notes, EmployeeKeyString, date1, empKey, OrgID) {

    const url = ConectionSettings.Url+"/addMeetingTraining";
    const obj = {
      actionKey: EventType,
      eventhost: eventHost,
      venue: Venue,
      MeetingNotes: Notes,
      meetingDate: date1,
      startTime: time1,
      endTime: time2,
      empKey: EmployeeKeyString,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(url, obj);
  }


  getMeetingTrainingDetails(eventKey, actionKey, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getEditViewTrainingMeetingDetails?EventKey=' + eventKey + '&ActionKey=' + actionKey + '&EmployeeKey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getallEmpsSelected(eventKey, actionKey, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getselectedEmployeeByEventKey?EventKey=' + eventKey + '&ActionKey=' + actionKey + '&EmployeeKey=' + empKey + '&OrganizationID=' + OrgID);

  }

  updateMeetingTraining(EventType, eventHost, Venue, time1, time2, Notes, EmployeeKeyString, date1, EventKey, empKey, OrgID) {

    const url = ConectionSettings.Url+"/updateEditMeetingDetails";
    const obj = {
      actionKey: EventType,
      eventhost: eventHost,
      venue: Venue,
      MeetingNotes: Notes,
      meetingDate: date1,
      startTime: time1,
      endTime: time2,
      empKey: EmployeeKeyString,
      employeekey: empKey,
      OrganizationID: OrgID,
      // actionTypeKey: EventType,
      eventKey: EventKey

    };
    return this.http.post(url, obj);
  }

  getEventTypeList(page, itemsPerPage, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getAllDefaultEvents?pageno=' + page + '&itemsPerPage=' + itemsPerPage + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  DeleteEventType(actionKey, actionTypeKey, OrgID) {
    const url = ConectionSettings.Url+"/deleteDefaultEventDetails?ActionKey=" + actionKey + "&ActionTypeKey=" + actionTypeKey + "&OrganizationID=" + OrgID;
    const obj = {};
    return this.http.post(url, obj);

  }

  getEventTypeDetails(actionKey, actionTypeKey, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getDefaultEventDetailsForEdit?actionKey=' + actionKey + '&actiontypeKey=' + actionTypeKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  UpdateEventType(type, name, desc, actionKey, actionTypeKey, empKey, OrgID) {
    const url = ConectionSettings.Url+"/submitDefaultEventDetails?ActionType=" + type + "&Action=" + name + "&Description=" + desc + "&ActionKey=" + actionKey + "&ActionTypeKey=" + actionTypeKey + "&employeekey=" + empKey + "&OrganizationID=" + OrgID;
    const obj = {};
    return this.http.post(url, obj);

  }
  // ****@Pooja's Code Starts here****
  CheckNewJobtitle(JobTitle,employeekey,OrganizationID)
  {
    return this
    .http
    .get(ConectionSettings.Url+'/checkForNewJobTittle?JobTitle='+ JobTitle+'&employeekey='+employeekey+'&OrganizationID='+OrganizationID);
  }
  getManagerForEmployeeForSuperAdmin(OrgID)
  {
    return this
    .http
    .get(ConectionSettings.Url+'/getManagerForEmployeeForSuperAdmin?OrganizationID='+ OrgID);
  }
  getUserRoleType(OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getAllUserRoleType_Admin?OrganizationID=' + OrgID);
  }
  getJobTitle(OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/JobtitleForSuperAdmin?OrganizationID='+OrgID);
  }
  getJobTitleforadmindd(employeekey,OrganizationID)
  {
    return this
      .http
      .get(ConectionSettings.Url+'/selectJobtitle?empkey='+employeekey+'&OrganizationID='+OrganizationID);
  }
  
  getSuperVisor(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/supervisorname?employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getDepartment(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/department?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  createEmployeebyManager(EmployeeNumber, FirstName, LastName, MiddleName, BD, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, HD, theCheckbox, JobTitleKey, SupervisorKey, DepartmentKey, empKey, OrgID,managerkey) {
    const url = ConectionSettings.Url+"/addemp";
    const obj = {
      employeenumber: EmployeeNumber,
      managerkey: managerkey,
      firstname: FirstName,
      lastname: LastName,
      middlename: MiddleName,
      birthDate: BD,
      gender: Gender,
      addressline1: AddressLine1,
      city: City,
      addressline2: AddressLine2,
      state: State,
      country: Country,
      primaryphone: PrimaryPhone,
      zipcode: ZipCode,
      alternatephone: AlternatePhone,
      email: EmailID,
      hireDate: HD,
      isSupervisor: theCheckbox,
      jobTitleKey: JobTitleKey,
      supervisorKey: SupervisorKey,
      departmentKey: DepartmentKey,
      metaupdatedBy: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(url, obj);
  }
  getAllEmployeeDetails(pagenumber, itemsPerPage, empkey, org) {
    return this
      .http
      .get(ConectionSettings.Url+'/getAllEmployees?pagenumber=' + pagenumber + '&itemsPerPage=' + itemsPerPage + '&empkey=' + empkey + '&OrganizationID=' + org);
  }
  getAllEmployeeDetailswithjobtitledropdown(seljobtitlevalue, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/searchEmpByJobTitle?jobtitleString=' + seljobtitlevalue + '&empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  searchResultOfEmployeedetailsTable(SearchValue, pageno, itemsPerPage, employeekey, OrganizationID) {
    return this
      .http
      .get(ConectionSettings.Url+'/searchEmployeeOnTable?searchEmployee=' + SearchValue + '&pageno=' + pageno + '&itemsPerPage=' + itemsPerPage + '&employeekey=' + employeekey + '&OrganizationID=' + OrganizationID);
  }


  UpdateEmployeeDetailsbyManager(mankey, empk, orgid, EmployeeNumber, userRoleTypeKey, FirstName, LastName, MiddleName, BirthDate, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, HireDate, IsSupervisor, SupervisorKey, JobTitleKey, DepartmentKey,remark) {
    const url = ConectionSettings.Url+"/update_employee_info";
    const obj = {
      EmployeeKey: empk,
      managerKey: mankey,
      EmployeeNumber: EmployeeNumber,
      FirstName: FirstName,
      LastName: LastName,
      MiddleName: MiddleName,
      JobTitleKey: JobTitleKey,
      AddressLine1: AddressLine1,
      AddressLine2: AddressLine2,
      City: City,
      State: State,
      ZipCode: ZipCode,
      Country: Country,
      PrimaryPhone: PrimaryPhone,
      AlternatePhone: AlternatePhone,
      birthDate: BirthDate,
      hireDate: HireDate,
      IsSupervisor: IsSupervisor,
      SupervisorKey: SupervisorKey,
      DepartmentKey: DepartmentKey,
      EmailID: EmailID,
      OrganizationID: orgid,
      Gender: Gender,
      UserRoleTypeKey: userRoleTypeKey,
      EmployeeStatusKey1: EmployeeStatusKey,
      Remark:remark
    };
    return this.http.post(url, obj);


  }
  getEmployeeStatusListforDropdown(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getEmployeeStatus?employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getJobTitleListforDropdown(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/selectJobtitle?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getDeptListforDropdown(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/department?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getSupervisorListforDropdown(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/supervisorname?employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  EditEmployeeDetailsbyManager(empk, orgid) {
    return this
      .http
      .get(ConectionSettings.Url+'/empDetails?SearchKey=' + empk + '&OrganizationID=' + orgid);
  }
  selectEmpWithJobTSprvsrAndDept(employeekey,OrganizationID,JobTitle,Supervisor,DepartmentKey)
  {
    const uri = ConectionSettings.Url+'/empSelectWithFilterInMeetCreate';
    const obj = {
      emKey: employeekey,
      OrgID: OrganizationID,
      JobT: JobTitle,
      Sup: Supervisor,
      DeptKey:DepartmentKey
    }; 
    return this.http.post(uri, obj);
  }
  // ****@Pooja's Code Ends here****

  getJobtitleView(empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/addNewJobTitle?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  searchJobtitle(SearchJobTitle, empKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/searchjobTitle?OrganizationID=' + OrgID + '&searchJobTitle=' + SearchJobTitle);
  }
  addJobtitle(jobtitleName, jobTitleDescription, empKey, OrgID) {
    const url = ConectionSettings.Url+"/addJobTitleNew";
    const obj = {
      JobTitle: jobtitleName,
      JobTitleDescription: jobTitleDescription,
      empkey: empKey,
      OrganizationID: OrgID
    };
    
    return this.http.post(url, obj);

  }
  checkfor_jobtitle(JobtitleName,employeekey,OrganizationID)
  {
    return this
    .http
    .get(ConectionSettings.Url+'/checkForNewJobTittle?JobTitle='+JobtitleName+'&employeekey='+employeekey+'&OrganizationID='+OrganizationID);
}
  getEditJobtitleDetails(JobTitleKey, OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/editviewJobTitle?JobTitleKey=' + JobTitleKey + '&OrganizationID=' + OrgID);
  }
  // ****@Pooja's Code Starts here****
  createEmployeebySuperAdmin(OrgID, ManagerKey, EmployeeNumber, UserRoleTypeKey, FirstName, LastName, MiddleName, BD, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, HD, theCheckbox, JobTitleKey, DepartmentKey, empKey) {
    const url = ConectionSettings.Url+"/addemp";
    const obj = {
      employeenumber: EmployeeNumber,
      managerkey: ManagerKey,
      firstname: FirstName,
      lastname: LastName,
      middlename: MiddleName,
      birthDate: BD,
      gender: Gender,
      addressline1: AddressLine1,
      city: City,
      addressline2: AddressLine2,
      state: State,
      country: Country,
      primaryphone: PrimaryPhone,
      zipcode: ZipCode,
      alternatephone: AlternatePhone,
      email: EmailID,
      hireDate: HD,
      isSupervisor: theCheckbox,
      jobTitleKey: JobTitleKey,
      departmentKey: DepartmentKey,
      metaupdatedBy: empKey,
      OrganizationID: OrgID
    };
    return this
      .http.post(url, obj);
  }
  getOrganization(OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getAllOrganization?OrganizationID=' + OrgID);
  }
  getUserRoleTypesa(OrgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getAllUserRoleType_SuperAdmin?OrganizationID=' + OrgID);
  }
  getAllEmployeeDetailswithjobtitledropdownsa(orgid, empkey, jobtikey, mankey, page, count) {
    const url = ConectionSettings.Url+"/employeeByAllFilter";
    const obj = {
      JobTitleKey: jobtikey,
      ManagerKey: mankey,
      employeekey: empkey,
      OrganizationID: orgid,
      pagenumber: page,
      itemsPerPage: count
    };
    return this
      .http.post(url, obj);
  }
  getvaluesForManagerDropdowninSA(empkey, orgid) {
    return this
      .http
      .get(ConectionSettings.Url+'/getManagerForEmployee?employeekey=' + empkey + '&OrganizationID=' + orgid);
  }
  DeleteEmployeeDetailsbyManager(delete_EmpKey, orgID, updatedby) {
    const url = ConectionSettings.Url+"/removeEmployee";
    const obj = {
      empKey: delete_EmpKey,
      updatedBy: updatedby,
      OrganizationID: orgID
    };
    return this
      .http.post(url, obj);
  }
  getOrganizationDDforSuprAdmin(orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getAllOrganization?OrganizationID=' + orgID);
  }
  EditEmployeeDetailsbySuperadmin(empk, orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/empDetails?SearchKey=' + empk + '&OrganizationID=' + orgID);
  }
  getDepartmentforddinSuperadmin(emplokey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/department?empkey=' + emplokey + '&OrganizationID=' + orgID);
  }
  getEmployeeStatusListforDropdowninSuperadmin(emplokey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getEmployeeStatus?employeekey=' + emplokey + '&OrganizationID=' + orgID);
  }
  getjobTitleforDropdowninSuperadmin(orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/JobtitleForSuperAdmin?OrganizationID=' + orgID);
  }
  UpdateEmployeeDetailsbySa(managerKey, empk, orgID, UserRoleTypeKey, EmployeeNumber, FirstName, LastName, MiddleName, birthdt, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, hiredt, IsSupervisor, JobTitleKey, DepartmentKey, Gender,remark) {
    const url = ConectionSettings.Url+"/update_employee_info";
    const obj = {
      EmployeeKey: empk,
      managerKey: managerKey,
      EmployeeNumber: EmployeeNumber,
      FirstName: FirstName,
      LastName: LastName,
      MiddleName: MiddleName,
      JobTitleKey: JobTitleKey,
      AddressLine1: AddressLine1,
      AddressLine2: AddressLine2,
      City: City,
      State: State,
      ZipCode: ZipCode,
      Country: Country,
      PrimaryPhone: PrimaryPhone,
      AlternatePhone: AlternatePhone,
      birthDate: birthdt,
      hireDate: hiredt,
      IsSupervisor: IsSupervisor,
      DepartmentKey: DepartmentKey,
      EmailID: EmailID,
      OrganizationID: orgID,
      UserRoleTypeKey: UserRoleTypeKey,
      EmployeeStatusKey1: EmployeeStatusKey,
      Gender: Gender,
      Remark:remark
    };
    return this.http.post(url, obj);
  }
  DeleteEmployeeDetailsbySuperadmin(delete_EmpKey, orgID, Updatdby) {
    const url = ConectionSettings.Url+"/removeEmployee";
    const obj = {
      empKey: delete_EmpKey,
      updatedBy: Updatdby,
      OrganizationID: orgID
    };
    return this
      .http.post(url, obj);
  }
  getMeetingTrainingViewforemployees(curr_date,toServeremployeekey,OrganizationID)
  {
    return this
    .http
    .get(ConectionSettings.Url+'/viewEmployeeMeetingTraining?meetingDate='+curr_date+'&employeekey='+toServeremployeekey+'&OrganizationID='+OrganizationID);
  }
  getMeetingTrainingViewforemployee(page, count, curr_date, empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/gettodaysMeeting?ondate=' + curr_date + '&employeekey=' + empKey + '&pageno=' + page + '&itemsPerPage=' + count + '&OrganizationID=' + orgID);
  }

  SearchMeetingviewforemployee(SearchValue, empKey, orgID, curr_date) {
    return this
      .http
      .get(ConectionSettings.Url+'/searchEmpMeetingORTraining?OrganizationID=' + orgID + '&searchActionType=' + SearchValue + '&toServeremployeekey=' + empKey + '&today_DT=' + curr_date);
  }
  getuserNamePasswordforsaveandSendemail(page, count, empKey, orgid) {
    return this
      .http
      .get(ConectionSettings.Url+'/getLoginDetailsForAllUsers?pageno=' + page + '&itemsperpage=' + count + '&employeekey=' + empKey + '&OrganizationID=' + orgid);
  }
  CheckForEmployeenumber(EmployeeNumber,employeekey,OrganizationID)
  {
    return this
    .http
    .get(ConectionSettings.Url+'/checkforEmployeeNumber?Employeenumber='+EmployeeNumber+'&employeekey='+employeekey+'&OrganizationID='+OrganizationID);
  }
  // ****@Pooja's Code Ends here****
  updateEditJobtitle(JobTitle_Key, jobtitleName, jobTitleDescription, empKey, OrgID) {

    const url = ConectionSettings.Url+"/updateSelectedJobTitle";
    const obj = {
      JobTitleKey: JobTitle_Key,
      JobTitle: jobtitleName,
      JobTitleDescription: jobTitleDescription,
      empkey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(url, obj);
  }
  deleteJobTitle(deleteJobtitleKey, OrgID) {
    const url = ConectionSettings.Url+"/deleteJobTitleSelected";
    const obj = {
      JobTitleKey: deleteJobtitleKey,
      OrganizationID: OrgID
    };
    return this.http.post(url, obj);
  }

  searchLoginCredsList(key, empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/searchEmployeeList?searchEmployee=' + key + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  getmanagersForEmp(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/getManagerForEmployee?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  createEmployeebyAdmin(EmployeeNumber, ManagerKey, FirstName, LastName, MiddleName, BD, Gender,
    AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, HD, issupervisor,
    JobTitleKey, DepartmentKey, employeekey, OrganizationID) {
    const url = ConectionSettings.Url+"/addemp";
    const obj = {
      employeenumber: EmployeeNumber,
      managerkey: ManagerKey,
      firstname: FirstName,
      lastname: LastName,
      middlename: MiddleName,
      birthDate: BD,
      gender: Gender,
      addressline1: AddressLine1,
      city: City,
      addressline2: AddressLine2,
      state: State,
      country: Country,
      primaryphone: PrimaryPhone,
      zipcode: ZipCode,
      alternatephone: AlternatePhone,
      email: EmailID,
      hireDate: HD,
      isSupervisor: issupervisor,
      jobTitleKey: JobTitleKey,
      departmentKey: DepartmentKey,
      metaupdatedBy: employeekey,
      OrganizationID: OrganizationID
    };
    return this.http.post(url, obj);
  }

  checkEmpNumber(empNumber, empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/checkforEmployeeNumber?Employeenumber=' + empNumber + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  checkUserName(userName, empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url+'/checkUsername?username=' + userName + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  setLoginCreds(userName, passWord, empKey, employeekey, uRoleTypeKey, OrgID) {
    const url = ConectionSettings.Url+"/setUsernamePassword";
    const obj = {
      username: userName,
      password: passWord,
      employeekey: empKey,
      updatedBy: employeekey,
      userRoleTypeKey: uRoleTypeKey,
      OrganizationID: OrgID
    };
    return this.http.post(url, obj);
  }

  getEmployeeByFilters(page,count,jobtKey, managerKey, empKey, orgID) {
    const url = ConectionSettings.Url+"/employeeByAllFilter";
    const obj = {
      JobTitleKey: jobtKey,
      ManagerKey: managerKey,
      employeekey: empKey,
      pagenumber: page,
      itemsPerPage: count,
      OrganizationID: orgID
    };
    return this.http.post(url, obj);
  }
  JobtitleForSuperAdmin(OrganizationID) {
    return this
      .http
      .get(ConectionSettings.Url+'/JobtitleForSuperAdmin?OrganizationID=' + OrganizationID);

  }
  addMeetinTraingByNewEvent(obj) {
    const url = ConectionSettings.Url+"/addMeetinTraingByNewEvent";
    return this.http.post(url, obj);
  }
  getempdettblwithslctdJbtitleNempStatus(JobTitleKey,EmployeeStatusKey,employeekey,OrganizationID){
    const url = ConectionSettings.Url+"/employeeByJbtitleNempStatusFilter";
    const obj = {
      JbTitlKy: JobTitleKey,
      empstskey: EmployeeStatusKey,
      empkey: employeekey,
      orgid: OrganizationID
    };
    return this.http.post(url, obj);
  }
}
