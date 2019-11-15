<%@ page import="com.vrs.service.PlaceService" %>
<%@ page import="com.vrs.entity.Place" %>
<%@ page import="java.util.List" %>
<%@ page import="com.vrs.controller.place.PlaceController" %>

<jsp:include page="view/header.jsp"/>
<jsp:include page="view/nav_bar.jsp"/>
<jsp:include page="view/carousel.jsp"/>

<%
    List<Place> allPlaces = new PlaceController().getAllPlaces();
%>

<section id="about" style="padding-top: 60px;padding-bottom: 60px">
    <div class="container" style="font-size: 16px">
        <%--<div class="row" style="font-size: 25px;text-align: center;font-weight: bold;margin-top: 20px">--%>
        <%--<div class="col-5">--%>
        <%--Book Your Taxi Now--%>
        <%--</div>--%>
        <%--<div class="col-2">--%>
        <%--<i class="fa fa-arrow-right"></i>--%>
        <%--</div>--%>
        <%--<div class="col-5">--%>

        <%--</div>--%>
        <div class="row" style="font-weight: bold;padding-top: 50px">
            <div class="col-sm-4">
                <div class="row" style="padding: 5px">
                    <div class="col-12">Pickup From</div>
                    <div class="col-12">
                        <select class="form-control" id="placeFrom">
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

            <div class="col-sm-4">
                <div class="row" style="padding: 5px">
                    <div class="col-12">Drop To</div>
                    <div class="col-12">
                        <select class="form-control" id="placeTo">
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

            <div class="col-sm-2">
                <div class="row" style="padding: 5px">
                    <div class="col-12">No of passengers</div>
                    <div class="col-12">
                        <input type="number" class="form-control" min="1" value="1" id="noOfPassengers">
                    </div>
                </div>
            </div>

            <div class="col-sm-2">
                <div class="row" style="padding: 5px">
                    <div class="col-12">Trip</div>
                    <div class="col-12">
                        <select name="" class="form-control" id="trip">
                            <option value="1">One way</option>
                            <option value="2">Round trip</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: 80px">
            <div class="col-sm-6" style="font-size: 30px;font-weight: bold;text-align: center;margin-top: 5px">
                <span style="padding: 20px;border: 4px solid #c4c4c4;border-radius: 50px">
                    <span style="margin-right: 20px">Total Cost</span> &euro;<span id="priceText"></span>
                </span>
            </div>
            <div class="col-sm-6" style="text-align: center">
                <a id="btnBookNow" class="btn btn-default btn-lg btn-padding" style="background-color: #FFCB05">Book
                    Your Taxi Now</a>
            </div>
        </div>
        <%--<div class="page-heading">--%>

        <%--</div>--%>
    </div>
    <%--</div>--%>
</section>

<script>

    $(window).on("load", function () {
        getPassengersPrice();
        validateInputs();
    });

    $('#placeFrom').change(function () {
        validateInputs();
    });

    $('#placeTo').change(function () {
        validateInputs();
    });

    $('#noOfPassengers').bind("keyup change", function (e) {
        getPassengersPrice();
    });

    $('#btnBookNow').click(function () {
        document.location.href = "${pageContext.request.contextPath}/view/customer/booking.jsp?placeFromId=" + $('#placeFrom').val() + "&placeToId=" + $('#placeTo').val() + "&noOfPassengers=" + $('#noOfPassengers').val() + "&trip=" + $('#trip').val();
        <%--document.location.href = "${pageContext.request.contextPath}/booking?placeFromId=" + $('#placeFrom').val() + "&placeToId=" + $('#placeTo').val() + "&noOfPassengers=" + $('#noOfPassengers').val() + "&trip=" + $('#trip').val();--%>
    })

    function validateInputs() {
        if (
            $('#placeFrom option:selected').val() !== '0' &&
            $('#placeTo option:selected').val() !== '0' &&
            $('#placeFrom option:selected').val() !== $('#placeTo option:selected').val()
        ) {
            $('#priceText').html(totalCost);
        } else {
            $('#priceText').html('0.00');
        }
    }

    var totalCost = 0.00;

    function getPassengersPrice() {
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/get_passengers_price",
                data: {
                    passengersCount: $('#noOfPassengers').val()
                },
                success: function (response) {
                    totalCost = JSON.parse(response).toFixed(2);
                    validateInputs();
                },
                error: function () {

                }
            }
        );
    }
</script>

<jsp:include page="view/footer.jsp"/>
