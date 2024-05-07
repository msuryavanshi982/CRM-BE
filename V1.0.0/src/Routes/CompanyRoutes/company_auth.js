const express = require('express');
const router = express.Router();
const { protect_Company } = require('../../Middlewares/protection');
const { registerCompany, login, addCompanyDetails, getCompany } = require('../../Controllers/companyControllers/company_auth');
const { createTeam, getTeamDetails,getTeams, updateTeamDetails, deleteTeam } = require('../../Controllers/companyControllers/teams');
const { addNewUser, getUsersByCompany, editUserProfile, deleteUser } = require('../../Controllers/companyControllers/user_auth');
const { approveListing } =require('../../Controllers/companyControllers/approveListings');
const {createRole, getRolesByCompanyId, updateRole, deleteRole} = require('../../Controllers/companyControllers/roles')
// Middlewares
const { connectCompanyDB } = require('../../Middlewares/dbConnection');
const {waterMark} = require('../../Controllers/settingsControllers/watermark');

router.post('/login', login)

router.post('/:companyid/profile', protect_Company, addCompanyDetails);

router.get('/:companyid/getCompany', protect_Company, getCompany);

router.post('/:companyid/createteam', protect_Company, createTeam);

router.get('/:teamid/getTeamDetails', protect_Company, getTeamDetails);

router.get('/:companyid/getTeams', protect_Company, getTeams);

router.put('/:companyid/:teamid/updateTeamDetails', protect_Company, updateTeamDetails);

router.delete('/:companyid/:teamid/deleteTeam', protect_Company, deleteTeam);

router.post('/:companyid/addnewuser', protect_Company, addNewUser);

router.put('/:companyid/edituserprofile/:userid', protect_Company, editUserProfile);

router.delete('/:companyid/deleteuser/:userid', protect_Company, deleteUser);

router.get('/:companyid/users', protect_Company, getUsersByCompany);

router.post('/:companyid/listingstatus', protect_Company, approveListing);

router.post('/signup', registerCompany);

router.post('/:companyid/role',protect_Company, createRole);

router.get('/:companyid/roles', protect_Company, getRolesByCompanyId);

router.patch('/:companyid/:roleid/roles', protect_Company, updateRole);

router.delete('/:companyid/:roleid/roles', protect_Company, deleteRole);

router.post('/:companyid/watermark', waterMark)


module.exports = router