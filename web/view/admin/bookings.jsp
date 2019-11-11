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
        <div class="row" style="margin-top: 70px;font-size: 15px">
            <div class="col-sm-7">
                <div class="row" style="font-size: 15px;margin-bottom: 30px;padding-right: 16px">
                    <div class="col-sm-6">
                        <div class="col-3"
                             style="text-align: right;margin-top: 5px;font-weight: bold;color: #636363">
                            Date :
                        </div>
                        <div class="col-9" style="padding-left: 5px">
                            <input type="date" class="form-control" value="<%= currentDate%>"
                                   min="<%= currentDate%>">
                        </div>
                    </div>
                    <div class="col-sm-6" style="border: 1px solid #dfdfdf;padding-bottom: 7px">
                    <%--<div class="col-sm-7">--%>
                        <div class="col-1" style="text-align: right;margin-top: 5px;color: #636363">
                            <i class="fa fa-arrow-left" style="cursor: pointer"></i>
                        </div>
                        <div class="col-10"
                             style="text-align: center;font-size: 14px;font-weight: bold;margin-top: 6px;color: #636363">
                            Pending / Completed Reservations
                        </div>
                        <div class="col-1" style="text-align: left;margin-top: 5px;color: #636363">
                            <i class="fa fa-arrow-right" style="cursor: pointer"></i>
                        </div>
                    </div>
                </div>
                <table width="100%">
                    <thead>
                    <tr>
                        <th width="15%" style="text-align: center">Date</th>
                        <th width="15%" style="text-align: center">Time</th>
                        <th width="63%" style="text-align: center">Reservation Number</th>
                        <th width="7%" style="text-align: center">View</th>
                    </tr>
                    </thead>
                    <tbody style="text-align: center">
                    <tr>
                        <td>2019-02-02</td>
                        <td>11:00 PM</td>
                        <td style="text-align: left;font-weight: bold">R123</td>
                        <td style="cursor: pointer"><i class="fa fa-search"></i></td>
                    </tr>
                    </tbody>
                </table>
                <div class="row" style="text-align: center;margin-top: 50px">
                    <div class="col-4">
                        <i class="fa fa-arrow-left fa-2x"></i>
                    </div>
                    <div class="col-4" style="font-size: 20px;font-weight: bold">
                        8 / 10
                    </div>
                    <div class="col-4">
                        <i class="fa fa-arrow-right fa-2x"></i>
                    </div>
                </div>
            </div>
            <div class="col-sm-5" style="margin-top: 65px">
                <div class="row" style="border: 1px solid #b8b8b8;padding: 5px;color: #4b4b4b">
                    <div class="col-sm-12"
                         style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 25px;color: black;font-weight: bold">
                        Taxi Details
                    </div>
                    <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">
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
                         style="padding: 5px;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldCustomerName">Not selected
                    </div>
                    <div class="col-5" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Email
                        Address
                    </div>
                    <div class="col-7"
                         style="padding: 5px;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldCustomerEmail">Not selected
                    </div>
                    <div class="col-5" style="padding: 5px;border-bottom: 1px solid #e2e2e2;font-weight: bold">Contact
                        No
                    </div>
                    <div class="col-7"
                         style="padding: 5px;font-weight: normal;border-bottom: 1px solid #e2e2e2"
                         id="fieldCustomerTelNo">Not selected
                    </div>
                    <div class="col-5" style="padding: 5px;font-weight: bold">Comments
                    </div>
                    <div class="col-7"
                         style="padding: 5px;font-weight: normal"
                         id="fieldCustomerComment">
                        Not selected
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<jsp:include page="../footer.jsp"/>