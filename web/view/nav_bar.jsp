<%
    HttpSession sessionLogin = request.getSession(false);
%>

<style>
    .headerMain {
        background-color: rgba(0, 0, 0, 0.404)
    }
</style>
<div class="home-container" style="z-index: 99999">
    <div id="header-bottom" class="headerMain" style="position: fixed">
        <nav class="navbar navbar-default transparent-nav navbar-custom black-menu" id="mynavbar"
             style="padding: 10px 0">
            <div class="container">

                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar1">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="#" class="navbar-brand"><span>VEHICLES ONLINE</span> 24 X 7</a>
                </div><!-- end navbar-header -->

                <div class="collapse navbar-collapse" id="myNavbar1">
                    <ul class="nav navbar-nav navbar-right">

                        <li class="dropdown"><a href="${pageContext.request.contextPath}/index.jsp"
                                                class="dropdown-toggle">Home</a>
                        </li>

                        <%
                            if (sessionLogin.getAttribute("accountType") != null) {
                        %>
                        <li class="dropdown"><a href="${pageContext.request.contextPath}/view/admin/bookings.jsp"
                                                class="dropdown-toggle">Bookings</a>
                        </li>

                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" style="cursor: pointer">Admin
                            Panel<span><i
                                    class="fa fa-angle-down"></i></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="${pageContext.request.contextPath}/view/admin/place_settings.jsp" style="cursor: pointer">Places</a></li>
                                <li><a style="cursor: pointer">Account Settings</a></li>
                            </ul>
                        </li>
                        <%
                            }
                        %>

                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown">Contact</a>
                        </li>

                        <%
                            if (sessionLogin.getAttribute("accountType") != null) {
                        %>
                        <li><a href="${pageContext.request.contextPath}/logout" style="cursor: pointer">Logout</a>
                        </li>
                        <%
                        } else {
                        %>
                        <li><a href="${pageContext.request.contextPath}/view/admin/login.jsp" style="cursor: pointer">Login</a>
                        </li>
                        <%
                            }
                        %>

                    </ul>
                </div><!-- end navbar collapse -->

            </div><!-- end container -->
        </nav><!-- end navbar -->
    </div><!-- end header-bottom -->
</div>
<!-- end home-container -->

<%--<script>--%>
<%--$('#btnHome').click(function () {--%>
<%--document.location.href = "${pageContext.request.contextPath}/index.jsp";--%>
<%--})--%>

<%--$('#btnLogin').click(function () {--%>
<%--document.location.href = "${pageContext.request.contextPath}/view/admin/login.jsp";--%>
<%--})--%>
<%--</script>--%>