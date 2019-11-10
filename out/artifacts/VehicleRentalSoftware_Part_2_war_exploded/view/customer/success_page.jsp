<%@ page import="com.vrs.controller.reservation.GetReservationController" %>
<%@ page import="com.vrs.entity.Reservation" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="com.vrs.controller.passenger.GetPassengersPriceController" %>
<%@ page import="javax.crypto.Cipher" %>
<%@ page import="java.security.Key" %>
<%@ page import="javax.crypto.spec.SecretKeySpec" %>
<%@ page import="java.util.Base64" %>
<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>
<jsp:include page="../carousel.jsp"/>

<div class="row" style="padding-top: 50px">
    <div class="col-sm-12" style="text-align: center">
        <span style="font-weight: bold">Note :- </span>
        (Your reservation is completed. Please check your email)
    </div>
</div>

<div class="row" style="font-weight: bold;padding-top: 40px;padding-bottom: 90px">
    <div class="col-sm-5" style="float: none;margin: 0 auto;">
        <div class="row" style="border: 1px solid #b8b8b8;padding: 5px;font-size: 15px;color: #4b4b4b">


            <%
                if (!request.getParameter("reservation").equals("0")) {
                    String reservationId = new String(Base64.getUrlDecoder().decode(request.getParameter("reservation")));
                    Reservation reservation = new GetReservationController().getReservation(Integer.parseInt(reservationId));
            %>

            <div class="col-sm-12"
                 style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 28px;color: black">Taxi
                Details
            </div>
            <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">
            <div class="col-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Reservation ID
            </div>
            <div class="col-6"
                 style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">
                R<%= reservation.getId()%>
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
                 style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2"><%= new SimpleDateFormat("hh:MM a").format(reservation.getReservationDateAndTime())%>
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
                &euro;<span><%= new GetPassengersPriceController().getPrice(reservation.getReservationAdults() + reservation.getReservationChildren() + reservation.getReservationInfants())%></span>
            </div>

            <%
            } else {
            %>
            <div class="col-sm-12"
                 style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 25px">Error in reservation
            </div>
            <%
                }
            %>
        </div>
    </div>
</div>

<jsp:include page="../footer.jsp"/>