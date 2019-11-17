<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>

<section id="custom-form-wrapper" class="innerpage-wrapper">

    <div id="login" class="innerpage-section-padding">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="custom-form">
                        <h3>Login</h3>
                        <form action="${pageContext.request.contextPath}/login" method="post">

                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Username" name="userEmail">
                                <span><i class="fa fa-user"></i></span>
                            </div>

                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Password" name="userPassword">
                                <span><i class="fa fa-lock"></i></span>
                            </div>

                            <%--<div class="custom-check">--%>
                            <%--<input type="checkbox" id="check" name="checkbox"/>--%>
                            <%--<label for="check"><span><i class="fa fa-check"></i></span>Remember Me</label>--%>
                            <%--</div><!-- end checkbox -->--%>

                            <button class="btn btn-yellow btn-block">Login</button>
                        </form>
                        <div style="margin-top: 30px">
                            <a style="font-weight: bold;cursor: pointer;text-decoration: none;color: black;">Forgot
                                password?</a>
                        </div>
                    </div><!-- end custom-form -->

                </div><!-- end columns -->
            </div><!-- end row -->
        </div><!-- end container -->
    </div><!-- end login -->

</section>
<!-- end innerpage-wrapper -->

<jsp:include page="../footer.jsp"/>
