<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>

<%
    HttpSession sessionLogin = request.getSession(false);

    if (sessionLogin.getAttribute("accountType") == null) {
%>
<jsp:forward page="../admin/login.jsp"/>
<%
    }
%>

<section id="about" style="padding-top: 50px;padding-bottom: 90px">
    <div class="container-fluid" style="margin-left: 10px;margin-right: 10px">
        <div class="row" style="margin-top: 40px;font-size: 14px">
            <div class="col-sm-12" style="margin-bottom: 20px;font-weight: bold;font-size: 20px">
                System Details (Contact Us)
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                Address
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                Telephone
            </div>
            <div class="col-sm-4" style="font-weight: bold">
                Email Address
            </div>
            <div class="col-sm-4">
                <input type="text" class="form-control">
            </div>
            <div class="col-sm-4">
                <input type="text" class="form-control">
            </div>
            <div class="col-sm-4">
                <input type="text" class="form-control">
            </div>
            <div class="col-sm-12 text-center" style="margin-top: 40px;margin-bottom: 20px">
                <button class="btn btn-default">
                    Submit Details
                </button>
            </div>
        </div>

        <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">

        <div class="row" style="margin-top: 40px;font-size: 14px">
            <div class="col-sm-12" style="margin-bottom: 20px;font-weight: bold;font-size: 20px">
                User Account
            </div>
            <div class="col-sm-6" style="font-weight: bold">
                Email
            </div>
            <div class="col-sm-6" style="font-weight: bold">
                Password
            </div>
            <div class="col-sm-6">
                <input type="text" class="form-control">
            </div>
            <div class="col-sm-6">
                <input type="text" class="form-control">
            </div>
            <div class="col-sm-12 text-center" style="margin-top: 40px">
                <button class="btn btn-default">
                    Submit User
                </button>
            </div>
        </div>
    </div>
</section>

<script src="${pageContext.request.contextPath}/controller/admin/accountSettingsController.js"></script>

<jsp:include page="../footer.jsp"/>