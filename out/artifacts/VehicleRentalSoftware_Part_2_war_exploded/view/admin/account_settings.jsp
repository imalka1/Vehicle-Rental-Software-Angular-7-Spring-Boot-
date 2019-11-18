<%@ page import="com.vrs.controller.rental_system.RentalSystemController" %>
<%@ page import="com.vrs.entity.RentalSystem" %>
<%@ page import="com.vrs.controller.user.UserController" %>
<%@ page import="com.vrs.entity.User" %>
<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>

<%
    HttpSession sessionLogin = request.getSession(false);
    RentalSystem rentalSystem = new RentalSystemController().getRentalSystem();
    User user = new UserController().getUser();
    if (sessionLogin.getAttribute("accountType") == null) {
%>
<jsp:forward page="../admin/login.jsp"/>
<%
    }
%>

<section id="about" style="padding-top: 50px;padding-bottom: 90px">
    <div class="container-fluid" style="margin-left: 10px;margin-right: 10px">
        <div class="row" style="margin-top: 40px;font-size: 14px;margin-bottom: 40px">
            <div class="col-sm-12" style="margin-bottom: 20px;font-weight: bold;font-size: 20px">
                System Details (Contact Us)
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                Address
            </div>
            <div class="col-sm-8" style="font-weight: bold">
                Telephone
            </div>
            <input type="hidden" class="form-control" value="<%= rentalSystem.getId()%>" id="systemId">
            <div class="col-sm-4">
                <input type="text" class="form-control" value="<%= rentalSystem.getAddress()%>" id="systemAddress">
            </div>
            <div class="col-sm-4">
                <input type="text" class="form-control" value="<%= rentalSystem.getTelNumber()%>" id="systemTelNo">
            </div>
            <div class="col-sm-4 text-center">
                <button class="btn btn-default" style="background-color: #FFCB05" id="btnSubmitDetails">
                    Submit Details
                </button>
            </div>
        </div>

        <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">

        <div class="row" style="margin-top: 40px;font-size: 14px">
            <div class="col-sm-12" style="margin-bottom: 20px;font-weight: bold;font-size: 20px">
                System Email
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                Email Address
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                New Password
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                Re-enter Password
            </div>

            <div class="col-sm-4">
                <input type="text" class="form-control" value="<%= rentalSystem.getEmailAddress()%>" id="systemEmail">
            </div>
            <div class="col-sm-4">
                <input type="password" class="form-control" id="password1">
            </div>
            <div class="col-sm-4">
                <input type="password" class="form-control" id="password2">
            </div>
            <div class="col-sm-12 text-center" style="margin-top: 40px;margin-bottom: 20px">
                <button class="btn btn-default" style="background-color: #FFCB05" id="btnSubmitEmail">
                    Submit Email
                </button>
            </div>
        </div>

        <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">

        <div class="row" style="margin-top: 40px;font-size: 14px">
            <div class="col-sm-12" style="margin-bottom: 20px;font-weight: bold;font-size: 20px">
                User Account
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                Email
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                Password
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                Re-enter Password
            </div>
            <input type="hidden" id="userId" value="<%= user.getId()%>">
            <div class="col-sm-4">
                <input type="text" class="form-control" id="userEmail" placeholder="Email Address" value="<%= user.getUserEmail()%>">
            </div>
            <div class="col-sm-4">
                <input type="password" class="form-control" id="userPassword1" placeholder="New Password">
            </div>
            <div class="col-sm-4">
                <input type="password" class="form-control" id="userPassword2" placeholder="Re-enter Password">
            </div>
            <div class="col-sm-12 text-center" style="margin-top: 40px">
                <button class="btn btn-default" style="background-color: #FFCB05" id="btnSubmitUser">
                    Submit User
                </button>
            </div>
        </div>
    </div>
</section>

<script src="${pageContext.request.contextPath}/controller/admin/accountSettingsController.js"></script>

<jsp:include page="../footer.jsp"/>