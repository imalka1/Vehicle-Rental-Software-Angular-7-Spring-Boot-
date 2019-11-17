<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>

<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>

<%
    HttpSession sessionLogin = request.getSession(false);

    String currentDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
    if (sessionLogin.getAttribute("accountType") == null) {
%>
<%--<jsp:forward page="../admin/login.jsp"/>--%>
<%
    }
%>

<style>
    table, th, td {
        border: 1px solid #b8b8b8;
        /*width: 100%;*/
    }

    th, td {
        padding: 5px;
        /*text-align: left;*/
    }
</style>

<section id="about" style="padding-top: 50px;padding-bottom: 90px">
    <div class="container-fluid" style="margin-left: 10px;margin-right: 10px">
        <div class="row" style="margin-top: 70px;font-size: 14px">
            <div class="col-sm-7">
                <div class="row" style="margin-bottom: 30px;padding-right: 16px">
                    <div class="col-sm-6">
                        <div class="col-3"
                             style="text-align: center;margin-top: 5px;font-weight: bold;color: #636363">
                            Date :
                        </div>
                        <div class="col-9">
                            <input type="date" class="form-control" value="<%= currentDate%>" id="reservationDate" style="font-weight: bold">
                        </div>
                    </div>
                    <div class="col-sm-6" style="border: 1px solid #dfdfdf;padding-bottom: 7px">
                        <%--<div class="col-sm-7">--%>
                        <div class="col-1" style="text-align: right;margin-top: 5px;color: #636363">
                            <i class="fa fa-arrow-left" style="cursor: pointer" id="reservationsLeft"></i>
                        </div>
                        <div class="col-10"
                             style="text-align: center;font-size: 14px;font-weight: bold;margin-top: 6px;color: #636363">
                            <span id="reservationsText"></span>
                        </div>
                        <div class="col-1" style="text-align: left;margin-top: 5px;color: #636363">
                            <i class="fa fa-arrow-right" style="cursor: pointer" id="reservationsRight"></i>
                        </div>
                    </div>
                </div>
                <table width="100%">
                    <thead>
                    <tr>
                        <th width="5%"></th>
                        <th width="33%" style="text-align: center">Reservation Number</th>
                        <th width="12%" style="text-align: center">Time</th>
                        <th width="25%" style="text-align: center">Place From</th>
                        <th width="25%" style="text-align: center">Place To</th>
                    </tr>
                    </thead>
                    <tbody style="text-align: center" id="reservationsBody">

                    </tbody>
                </table>
                <%--<div class="row" style="text-align: center;margin-top: 50px">--%>
                    <%--<div class="col-4">--%>
                        <%--<i class="fa fa-arrow-left fa-2x" id="pageLeft" style="cursor: pointer"></i>--%>
                    <%--</div>--%>
                    <%--<div class="col-4" style="font-size: 20px;font-weight: bold" id="pagination">--%>

                    <%--</div>--%>
                    <%--<div class="col-4">--%>
                        <%--<i class="fa fa-arrow-right fa-2x" id="pageRight" style="cursor: pointer"></i>--%>
                    <%--</div>--%>
                <%--</div>--%>
            </div>
            <div class="col-sm-5" style="font-size: 15px">
                <div class="row">
                    <div class="col-sm-6 text-center">
                        <button class="btn btn-default" style="background-color: #FFCB05;padding: 10px;font-size: 14px" id="btnChangeReservationComplete">Complete Reservation</button>
                    </div>
                    <div class="col-sm-6 text-center">
                        <button class="btn btn-default" style="background-color: #FFCB05;padding: 10px;font-size: 14px" id="btnRemoveReservation">Remove Reservation</button>
                    </div>
                </div>
                <div class="row" style="border: 1px solid #b8b8b8;padding: 5px;color: #4b4b4b;margin-top: 25px">
                    <div class="col-sm-12"
                         style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 25px;color: black;font-weight: bold">
                        Taxi Details
                    </div>
                    <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">
                    <div class="col-5" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">
                        Reservation Number
                    </div>
                    <div class="col-7"
                         style="padding: 5px;font-weight: normal;border-bottom: 1px solid #e2e2e2;text-align: right"
                         id="fieldReservationId">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Pickup
                        From
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldPickUpFrom">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Drop To
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldDropTo">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Trip
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldTrip">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Pickup
                        Date
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldPickupDate">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Pickup
                        Time
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldPickupTime">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Adults
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldAdults">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">
                        Children
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldChildren">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Infants
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldInfants">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">No of
                        passengers
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldNoOfPassengers">Not selected
                    </div>
                    <div class="col-6" style="padding: 5px;font-size: 30px;color: black;font-weight: bold">Total Cost
                    </div>
                    <div class="col-6"
                         style="padding: 5px;font-size: 30px;text-align: right;color: black;font-weight: bold">
                        &euro;<span
                            id="priceText">0.00</span>
                    </div>
                </div>
                <div class="row" style="border: 1px solid #b8b8b8;padding: 5px;color: #4b4b4b;margin-top: 15px">
                    <div class="col-sm-12"
                         style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 25px;color: black;font-weight: bold">
                        Customer Details
                    </div>
                    <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">
                    <div class="col-5" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Customer
                        Name
                    </div>
                    <div class="col-7"
                         style="padding: 5px;font-weight: normal;border-bottom: 1px solid #e2e2e2;text-align: right"
                         id="fieldCustomerName">Not selected
                    </div>
                    <div class="col-5" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Email
                    </div>
                    <div class="col-7"
                         style="padding: 5px;font-weight: normal;border-bottom: 1px solid #e2e2e2;text-align: right"
                         id="fieldCustomerEmail">Not selected
                    </div>
                    <div class="col-5" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Contact
                        No
                    </div>
                    <div class="col-7"
                         style="padding: 5px;font-weight: normal;border-bottom: 1px solid #e2e2e2;text-align: right"
                         id="fieldCustomerTelNo">Not selected
                    </div>
                    <div class="col-5" style="padding: 5px;font-weight: bold">Comments
                    </div>
                    <div class="col-7"
                         style="padding: 5px;font-weight: normal;text-align: justify;direction: rtl"
                         id="fieldCustomerComment">
                        Not selected
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="${pageContext.request.contextPath}/controller/admin/bookingsController.js"></script>

<jsp:include page="../footer.jsp"/>