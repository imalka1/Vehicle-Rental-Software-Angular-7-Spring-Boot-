<%@ page import="com.vrs.controller.reservation.ReservationController" %>
<%@ page import="com.vrs.entity.Reservation" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Base64" %>

<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>
<jsp:include page="../carousel.jsp"/>

<%
    if (request.getParameter("reservation") == null) {
%>
<jsp:forward page="../../index.jsp"/>
<%
    }
%>

<section id="about" style="padding-top: 50px;padding-bottom: 90px">
    <div class="container">
        <%
            if (!request.getParameter("reservation").equals("0")) {
                try {
                    String reservationId = new String(Base64.getUrlDecoder().decode(request.getParameter("reservation")));
                    Reservation reservation = new ReservationController().getReservation(Integer.parseInt(reservationId));
                    if (reservation != null) {
        %>
        <div class="row">
            <div class="col-sm-12" style="text-align: center">
                <span style="font-weight: bold">Note :- </span>
                (Your reservation is completed. Please check your email)
            </div>
        </div>

        <div class="row" style="font-weight: bold;padding-top: 40px">
            <div class="col-sm-6" style="float: none;margin: 0 auto;">
                <div class="row" style="border: 1px solid #b8b8b8;padding: 5px;font-size: 15px;color: #4b4b4b">

                    <div class="col-sm-12"
                         style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 28px;color: black">
                        Taxi
                        Details
                    </div>
                    <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">

                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Reservation Number
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">
                        R<%= reservation.getId()%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Customer
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">
                        <%= reservation.getReservationCustomer().getCustomerTitle() + reservation.getReservationCustomer().getCustomerName()%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Pickup
                        From
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= reservation.getReservationPlaceFrom().getPlaceName()%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Drop To
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= reservation.getReservationPlaceTo().getPlaceName()%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Trip</div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= reservation.getReservationTrip() == 1 ? "One way" : "Round trip"%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Pickup Date
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= new SimpleDateFormat("yyyy-MM-dd").format(reservation.getReservationDateAndTime())%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Pickup Time
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= new SimpleDateFormat("hh:mm a").format(reservation.getReservationDateAndTime())%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Adults
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= reservation.getReservationAdults()%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">
                        Children
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= reservation.getReservationChildren()%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Infants
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= reservation.getReservationInfants()%>
                    </div>
                    <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">No of
                        passengers
                    </div>
                    <div class="col-6"
                         style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= reservation.getReservationAdults() + reservation.getReservationChildren() + reservation.getReservationInfants()%>
                    </div>
                    <div class="col-6" style="padding: 5px;font-size: 32px;color: black">Total Cost</div>
                    <div class="col-6" style="padding: 5px;font-size: 32px;text-align: right;color: black">
                        &euro;<span><%= String.format("%.2f", reservation.getReservationPassenger().getPassengersPrice())%></span>
                    </div>

                </div>
            </div>
        </div>
        <%
        } else {
        %>
        <div class="row" style="font-weight: bold;padding-top: 40px">
            <div class="col-sm-6" style="float: none;margin: 0 auto;">
                <div class="row" style="border: 1px solid #b8b8b8;padding: 5px;font-size: 15px;color: #4b4b4b">
                    <div class="col-sm-12"
                         style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 25px">
                        Something went wrong
                    </div>
                </div>
            </div>
        </div>
        <%
            }
        } catch (Exception e) {
        %>
        <div class="row" style="font-weight: bold;padding-top: 40px">
            <div class="col-sm-6" style="float: none;margin: 0 auto;">
                <div class="row" style="border: 1px solid #b8b8b8;padding: 5px;font-size: 15px;color: #4b4b4b">
                    <div class="col-sm-12"
                         style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 25px">
                        Something went wrong
                    </div>
                </div>
            </div>
        </div>
        <%
            }
        } else {
        %>
        <div class="row" style="font-weight: bold;padding-top: 40px">
            <div class="col-sm-6" style="float: none;margin: 0 auto;">
                <div class="row" style="border: 1px solid #b8b8b8;padding: 5px;font-size: 15px;color: #4b4b4b">
                    <div class="col-sm-12"
                         style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 25px">
                        Something went wrong
                    </div>
                </div>
            </div>
        </div>
        <%
            }
        %>
    </div>
</section>

<jsp:include page="../footer.jsp"/>