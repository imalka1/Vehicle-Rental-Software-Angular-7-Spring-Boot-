<%@ page import="com.vrs.service.PlaceService" %>
<%@ page import="java.util.List" %>
<%@ page import="com.vrs.entity.Place" %>
<jsp:include page="view/header.jsp"/>
<jsp:include page="view/nav_bar.jsp"/>
<jsp:include page="view/carousel.jsp"/>

<section id="about" style="padding-top: 60px;padding-bottom: 80px">
    <div class="container" style="font-size: 16px">
        <div class="row" style="font-size: 25px;text-align: center;font-weight: bold">
            <div class="col-12">
                Book Your Taxi Now
            </div>
        </div>

        <hr style="margin-top: 50px;margin-bottom: 10px;margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">

        <div class="row" style="font-weight: bold;padding-top: 50px">
            <div class="col-sm-4">
                <div class="row" style="padding: 5px">
                    <div class="col-12">Pickup From</div>
                    <div class="col-12">
                        <select class="form-control">
                            <%
                                {
                                    List<Place> allPlaces = new PlaceService().getAllPlaces();
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
                        <select class="form-control">
                            <%
                                {
                                    List<Place> allPlaces = new PlaceService().getAllPlaces();
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
                        <input type="number" class="form-control" min="1" value="1">
                    </div>
                </div>
            </div>

            <div class="col-sm-2">
                <div class="row" style="padding: 5px">
                    <div class="col-12">Trip</div>
                    <div class="col-12">
                        <select name="" class="form-control">
                            <option value="">One way</option>
                            <option value="">Round trip</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="page-heading" style="margin-top: 50px">
                <div class="col-sm-12">
                    <a class="btn btn-default btn-lg btn-padding" style="background-color: #FFCB05">Book Now</a>
                </div>
            </div>
        </div>
    </div>
</section>

<jsp:include page="view/footer.jsp"/>
