<%@ page import="com.vrs.service.PlaceService" %>
<%@ page import="com.vrs.entity.Place" %>
<%@ page import="java.util.List" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>

<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>
<jsp:include page="../carousel.jsp"/>

<%

    if (request.getParameter("placeFromId") == null && request.getParameter("placeToId") == null && request.getParameter("noOfPassengers") == null && request.getParameter("trip") == null) {

%>
<jsp:forward page="../../index.jsp"/>
<%
    }

    String currentDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
    String currentTime = new SimpleDateFormat("HH:mm").format(new Date());

    List<Place> allPlaces = new PlaceService().getAllPlaces();
%>

<input type="hidden" id="pickUpFromIndex" value="<%= request.getParameter("placeFromId")%>">
<input type="hidden" id="dropToIndex" value="<%= request.getParameter("placeToId")%>">
<input type="hidden" id="noOfPassengersIndex" value="<%= request.getParameter("noOfPassengers")%>">
<input type="hidden" id="tripIndex" value="<%= request.getParameter("trip")%>">

<section id="about" style="padding-top: 80px;padding-bottom: 80px">
    <form action="${pageContext.request.contextPath}/makeReservation" method="post" name="makeReservatio">
        <div class="container" style="font-size: 16px">
            <div class="row" style="font-size: 25px;text-align: center;font-weight: bold">
                <div class="col-12">
                    <span style="padding: 18px;border-radius: 50px;border: 3px solid #FFCB05">Booking Details</span>
                </div>
            </div>

            <%--<hr style="margin-top: 50px;margin-bottom: 10px;margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">--%>

            <div class="row" style="font-weight: bold;padding-top: 90px">
                <div class="col-sm-7" style="padding: 20px">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="row" style="padding: 5px">
                                <div class="col-12">Pickup From</div>
                                <div class="col-12">
                                    <select class="form-control" id="placeFrom" name="placeFrom">
                                        <option value="0">Pickup From</option>
                                        <%
                                            {
                                                for (Place place : allPlaces) {
                                        %>
                                        <option value="<%= place.getId()%>"><%= place.getPlaceName()%>
                                        </option>
                                        <%
                                                }
                                            }
                                        %>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div class="col-sm-6">
                            <div class="row" style="padding: 5px">
                                <div class="col-12">Drop To</div>
                                <div class="col-12">
                                    <select class="form-control" id="placeTo" name="placeTo">
                                        <option value="0">Drop To</option>
                                        <%
                                            {
                                                for (Place place : allPlaces) {
                                        %>
                                        <option value="<%= place.getId()%>"><%= place.getPlaceName()%>
                                        </option>
                                        <%
                                                }
                                            }
                                        %>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4" style="margin-top: 20px">
                            <div class="row" style="padding: 5px;padding-top: 20px">
                                <div class="col-12">Trip</div>
                                <div class="col-12">
                                    <select name="trip" class="form-control" id="trip">
                                        <option value="1">One way</option>
                                        <option value="2">Round trip</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4" style="margin-top: 20px">
                            <div class="row" style="padding: 5px;padding-top: 20px">
                                <div class="col-12">Pickup Date</div>
                                <div class="col-12">
                                    <input type="date" class="form-control" id="pickupDate" name="pickupDate"
                                           value="<%= currentDate%>"
                                           min="<%= currentDate%>">
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4" style="margin-top: 20px">
                            <div class="row" style="padding: 5px;padding-top: 20px">
                                <div class="col-12">Pickup Time</div>
                                <div class="col-12">
                                    <input type="time" class="form-control" id="pickupTime" name="pickupTime"
                                           value="<%= currentTime%>">
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12" style="margin-top: 20px">
                            <div class="row" style="padding: 5px;padding-top: 20px">
                                <div class="col-sm-4"
                                     style="float: none;margin: 0 auto;padding-left: 5px;padding-right: 5px">No of
                                    passengers
                                </div>
                                <div class="col-sm-4"
                                     style="float: none;margin: 0 auto;padding-left: 5px;padding-right: 5px">
                                    <input type="number" class="form-control" min="0" value="0" id="noOfPassengers"
                                           name="noOfPassengers">
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4" style="margin-top: 20px">
                            <div class="row" style="padding: 5px;padding-top: 20px">
                                <div class="col-12">Adults</div>
                                <div class="col-12">
                                    <input type="number" class="form-control" min="0" value="0" id="adults"
                                           name="adults">
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4" style="margin-top: 20px">
                            <div class="row" style="padding: 5px;padding-top: 20px">
                                <div class="col-12">Children</div>
                                <div class="col-12">
                                    <input type="number" class="form-control" min="0" value="0" id="children"
                                           name="children">
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4" style="margin-top: 20px">
                            <div class="row" style="padding: 5px;padding-top: 20px">
                                <div class="col-12">Infants</div>
                                <div class="col-12">
                                    <input type="number" class="form-control" min="0" value="0" id="infants"
                                           name="infants">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-sm-5">
                    <div class="row" style="border: 1px solid #b8b8b8;padding: 5px">
                        <div class="col-sm-12"
                             style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 25px">Taxi Details
                        </div>
                        <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">
                        <div class="col-6 clsPlaceFrom" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Pickup
                            From
                        </div>
                        <div class="col-6 clsPlaceFrom"
                             style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                             id="fieldPickUpFrom"></div>
                        <div class="col-6 clsPlaceTo" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Drop To
                        </div>
                        <div class="col-6 clsPlaceTo"
                             style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                             id="fieldDropTo"></div>
                        <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Trip</div>
                        <div class="col-6"
                             style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                             id="fieldTrip"></div>
                        <div class="col-6 clsDate" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Pickup Date
                        </div>
                        <div class="col-6 clsDate"
                             style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                             id="fieldPickupDate">Pickup Date
                        </div>
                        <div class="col-6 clsTime" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Pickup Time
                        </div>
                        <div class="col-6 clsTime"
                             style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                             id="fieldPickupTime">Pickup Time
                        </div>
                        <div class="col-6 clsPassengers" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Adults
                        </div>
                        <div class="col-6 clsPassengers"
                             style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                             id="fieldAdults">0
                        </div>
                        <div class="col-6 clsPassengers" style="padding: 5px;border-bottom: 1px solid #e2e2e2">
                            Children
                        </div>
                        <div class="col-6 clsPassengers"
                             style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                             id="fieldChildren">0
                        </div>
                        <div class="col-6 clsPassengers" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Infants
                        </div>
                        <div class="col-6 clsPassengers"
                             style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                             id="fieldInfants">0
                        </div>
                        <div class="col-6 clsPassengers" style="padding: 5px;border-bottom: 1px solid #e2e2e2">No of
                            passengers
                        </div>
                        <div class="col-6 clsPassengers"
                             style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                             id="fieldNoOfPassengers"></div>
                        <div class="col-6" style="padding: 5px;font-size: 30px">Total Cost</div>
                        <div class="col-6" style="padding: 5px;font-size: 30px;text-align: right">&euro;<span
                                id="priceText"></span>
                        </div>
                    </div>
                </div>
            </div>

            <hr style="margin-top: 60px;margin-bottom: 10px;margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">

            <div class="row" style="font-size: 25px;text-align: center;font-weight: bold;margin-top: 80px">
                <div class="col-12">
                    <span style="padding: 18px;border-radius: 50px;border: 3px solid #FFCB05">Customer Details</span>
                </div>
            </div>

            <input type="hidden" id="customerId" name="customerId">

            <div class="row" style="font-weight: bold;padding-top: 70px">
                <div class="col-sm-6">
                    <div class="row" style="padding: 10px">
                        <div class="col-12" style="font-weight: bold">Email <span style="font-size: 13px">(Your email will suggest other details)</span>
                        </div>
                        <div class="col-12">
                            <input type="text" class="form-control" id="customerEmail" name="customerEmail"></div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="row" style="padding: 10px">
                        <div class="col-12" style="font-weight: bold">Contact Number</div>
                        <div class="col-12">
                            <input type="text" class="form-control" id="customerContact" name="customerContact">
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="row" style="padding: 10px">
                        <div class="col-12" style="font-weight: bold">Your Name</div>
                        <div class="col-12">
                            <input type="text" class="form-control" id="customerName" name="customerName">
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="row" style="padding: 10px">
                        <div class="col-12" style="font-weight: bold">Your Comment</div>
                        <div class="col-12">
                            <textarea class="form-control" style="height: 150px" name="customerComments"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="page-heading">
                    <div class="col-sm-12" style="margin-top: 50px">
                        <button class="btn btn-default btn-lg btn-padding" id="btnSubmitReservation" type="submit"
                                style="background-color: #FFCB05">Submit Reservation
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12" style="margin-top: 50px;font-size: 13px;text-align: center">
                    <span style="font-weight: bold">Note : </span>(Please complete all fields to submit, your submission will enable after you complete all fields)
                </div>
            </div>
        </div>
    </form>
</section>

<script src="${pageContext.request.contextPath}/controller/customer/booking.js"></script>

<jsp:include page="../footer.jsp"/>