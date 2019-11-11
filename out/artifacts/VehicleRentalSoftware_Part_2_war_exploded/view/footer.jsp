<%@ page import="com.vrs.controller.rental_system.RentalSystemController" %>
<%@ page import="com.vrs.entity.RentalSystem" %>

<%
    RentalSystem rentalSystem = new RentalSystemController().getRentalSystem();
%>
<section>
    <div id="footer-top" class="banner-padding">
        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-left" id="company">
                    <h4 class="footer-heading">Services</h4>
                    <ul class="list-unstyled">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Rooms</a></li>
                        <li><a href="#">Dinning</a></li>
                        <li><a href="#">Staff</a></li>
                        <li><a href="#">Blog's</a></li>
                    </ul>
                </div><!-- end useful-links -->

                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-left" id="contact-us">
                    <h4 class="footer-heading">Contact Us</h4>
                    <ul class="list-unstyled">
                        <li><span><i class="fa fa-map-marker"></i></span><%= rentalSystem.getAddress()%>
                        </li>
                        <li><span><i class="fa fa-phone"></i></span><%= rentalSystem.getTelNumber()%>
                        </li>
                        <li><span><i class="fa fa-envelope"></i></span><%= rentalSystem.getEmailAddress()%>
                        </li>
                    </ul>

                </div><!-- end social-links -->

            </div><!-- end row -->
        </div><!-- end container -->
    </div><!-- end footer-top -->

    <div id="footer-bottom">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" id="copyright">
                    <!--<p>© 2017 <a href="#">StarHotel</a>. All rights reserved.</p>-->
                </div><!-- end columns -->

                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" id="terms">
                    <ul class="list-unstyled list-inline">
                        <!--<li><a href="#">Terms & Condition</a></li>-->
                        <!--<li><a href="#">Privacy Policy</a></li>-->
                    </ul>
                </div><!-- end columns -->
            </div><!-- end row -->
        </div><!-- end container -->
    </div><!-- end footer-bottom -->

</section>
<!--Footer Section Ends-->

</body>

<!-- Mirrored from kiswa.net/themes/star-hotel/homepage-1-slider.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 06 Mar 2019 16:32:27 GMT -->
</html>