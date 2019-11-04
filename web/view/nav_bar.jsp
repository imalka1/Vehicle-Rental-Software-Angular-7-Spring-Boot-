<style>
    .headerMain{
        background-color: rgba(0, 0, 0, 0.404)
    }
</style>
<div class="home-container" style="z-index: 99999">
    <div id="header-bottom" class="headerMain" style="position: fixed">
        <nav class="navbar navbar-default transparent-nav navbar-custom black-menu" id="mynavbar" style="padding: 10px 0">
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

                        <li class="dropdown"><a href="${pageContext.request.contextPath}/index.jsp" class="dropdown-toggle" data-toggle="dropdown">Home</a>
                        </li>

                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown">Bookings</a>
                        </li>

                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" style="cursor: pointer">Admin Panel<span><i
                                class="fa fa-angle-down"></i></span></a>
                            <ul class="dropdown-menu">
                                <li><a style="cursor: pointer">Drivers</a></li>
                                <li><a style="cursor: pointer">Places</a></li>
                                <li><a style="cursor: pointer">Vehicles</a></li>
                            </ul>
                        </li>

                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown">Contact</a>
                        </li>

                        <li><a style="cursor: pointer">Login</a></li>

                    </ul>
                </div><!-- end navbar collapse -->

            </div><!-- end container -->
        </nav><!-- end navbar -->
    </div><!-- end header-bottom -->
</div><!-- end home-container -->