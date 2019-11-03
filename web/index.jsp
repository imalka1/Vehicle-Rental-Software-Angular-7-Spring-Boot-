<jsp:include page="view/header.jsp"/>
<jsp:include page="view/nav_bar.jsp"/>
<jsp:include page="view/carousel.jsp"/>

<section id="about" style="padding-top: 60px;padding-bottom: 80px">
    <div class="container" style="font-size: 16px">
        <div class="row" style="font-size: 25px;text-align: center;font-weight: bold;margin-top: 20px">
            <div class="col-5">
                Book Your Taxi Now
            </div>
            <div class="col-2">
                <i class="fa fa-arrow-right"></i>
            </div>
            <div class="col-5">
                <div class="page-heading">
                    <div class="col-sm-12">
                        <a id="btnBookNow" class="btn btn-default btn-lg btn-padding" style="background-color: #FFCB05">Book Now</a>
                    </div>
                </div>
            </div>
            <%--<div class="row" style="font-weight: bold;padding-top: 50px">--%>
                <%--<div class="col-sm-4">--%>
                    <%--<div class="row" style="padding: 5px">--%>
                        <%--<div class="col-12">Pickup From</div>--%>
                        <%--<div class="col-12">--%>
                            <%--<select class="form-control" id="placeFrom">--%>
                                <%--<%--%>
                                    <%--{--%>
                                        <%--List<Place> allPlaces = new PlaceService().getAllPlaces();--%>
                                        <%--for (Place place : allPlaces) {--%>
                                <%--%>--%>
                                <%--<option value="<%= place.getId()%>"><%= place.getPlaceName()%>--%>
                                <%--</option>--%>
                                <%--<%--%>
                                        <%--}--%>
                                    <%--}--%>
                                <%--%>--%>
                            <%--</select>--%>
                        <%--</div>--%>
                    <%--</div>--%>

                <%--</div>--%>

                <%--<div class="col-sm-4">--%>
                    <%--<div class="row" style="padding: 5px">--%>
                        <%--<div class="col-12">Drop To</div>--%>
                        <%--<div class="col-12">--%>
                            <%--<select class="form-control" id="placeTo">--%>
                                <%--<%--%>
                                    <%--{--%>
                                        <%--List<Place> allPlaces = new PlaceService().getAllPlaces();--%>
                                        <%--for (Place place : allPlaces) {--%>
                                <%--%>--%>
                                <%--<option value="<%= place.getId()%>"><%= place.getPlaceName()%>--%>
                                <%--</option>--%>
                                <%--<%--%>
                                        <%--}--%>
                                    <%--}--%>
                                <%--%>--%>
                            <%--</select>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>

                <%--<div class="col-sm-2">--%>
                    <%--<div class="row" style="padding: 5px">--%>
                        <%--<div class="col-12">No of passengers</div>--%>
                        <%--<div class="col-12">--%>
                            <%--<input type="number" class="form-control" min="1" value="1" id="noOfPassengers">--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>

                <%--<div class="col-sm-2">--%>
                    <%--<div class="row" style="padding: 5px">--%>
                        <%--<div class="col-12">Trip</div>--%>
                        <%--<div class="col-12">--%>
                            <%--<select name="" class="form-control" id="trip">--%>
                                <%--<option value="1">One way</option>--%>
                                <%--<option value="2">Round trip</option>--%>
                            <%--</select>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
        </div>
    </div>
</section>

<script>
    $('#btnBookNow').click(function () {
        document.location.href = "${pageContext.request.contextPath}/view/customer/booking.jsp?placeFromId=" + $('#placeFrom').val() + "&placeToId=" + $('#placeTo').val() + "&noOfPassengers=" + $('#noOfPassengers').val() + "&trip=" + $('#trip').val();
    })
</script>

<jsp:include page="view/footer.jsp"/>
