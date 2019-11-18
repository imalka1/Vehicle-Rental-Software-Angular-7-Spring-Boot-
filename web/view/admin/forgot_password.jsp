<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>

<section id="custom-form-wrapper" class="innerpage-wrapper">

    <div id="login" class="innerpage-section-padding">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="custom-form">
                        <h3>Reset Password</h3>
                        <div class="form-group" style="margin-top: 40px">
                            <input type="text" class="form-control" placeholder="Email Address" id="userEmail">
                            <span><i class="fa fa-envelope"></i></span>
                        </div>

                        <div id="passwordFields">

                        </div>

                        <button class="btn btn-yellow btn-block" id="btnReset">Send Email</button>
                    </div><!-- end custom-form -->

                </div><!-- end columns -->
            </div><!-- end row -->
        </div><!-- end container -->
    </div><!-- end login -->

</section>
<!-- end innerpage-wrapper -->

<script src="${pageContext.request.contextPath}/controller/admin/forgotPasswordController.js"></script>

<jsp:include page="../footer.jsp"/>
