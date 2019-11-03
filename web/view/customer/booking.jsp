<%@ page import="com.vrs.service.PlaceService" %>
<%@ page import="com.vrs.entity.Place" %>
<%@ page import="java.util.List" %>
<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>
<jsp:include page="../carousel.jsp"/>

<section id="about" style="padding-top: 60px;padding-bottom: 80px">
    <div class="container" style="font-size: 16px">
        <div class="row" style="font-size: 25px;text-align: center;font-weight: bold">
            <div class="col-12">
                <span style="padding: 18px;border-radius: 50px;border: 1px solid #FFCB05">Book Your Taxi Now</span>
            </div>
        </div>

        <hr style="margin-top: 50px;margin-bottom: 10px;margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">

        <div class="row" style="font-weight: bold;padding-top: 50px">
            <div class="col-sm-7" style="padding: 20px">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="row" style="padding: 5px">
                            <div class="col-12">Pickup From</div>
                            <div class="col-12">
                                <select class="form-control" id="placeFrom">
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

                    <div class="col-sm-6">
                        <div class="row" style="padding: 5px">
                            <div class="col-12">Drop To</div>
                            <div class="col-12">
                                <select class="form-control" id="placeTo">
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
                        <div class="row" style="padding: 5px;padding-top: 20px">
                            <div class="col-12">Trip</div>
                            <div class="col-12">
                                <select name="" class="form-control" id="trip">
                                    <option value="1">One way</option>
                                    <option value="2">Round trip</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4">
                        <div class="row" style="padding: 5px;padding-top: 20px">
                            <div class="col-12">Pickup Date</div>
                            <div class="col-12">
                                <input type="date" class="form-control" id="pickupDate">
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4">
                        <div class="row" style="padding: 5px;padding-top: 20px">
                            <div class="col-12">Pickup Time</div>
                            <div class="col-12">
                                <input type="time" class="form-control" id="pickupTime">
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="row" style="padding: 5px;padding-top: 20px">
                            <div class="col-12">Adults</div>
                            <div class="col-12">
                                <input type="number" class="form-control" min="0" value="0" id="noOfPassengers">
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="row" style="padding: 5px;padding-top: 20px">
                            <div class="col-12">Children</div>
                            <div class="col-12">
                                <input type="number" class="form-control" min="0" value="0" id="noOfPassengers">
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="row" style="padding: 5px;padding-top: 20px">
                            <div class="col-12">Infants</div>
                            <div class="col-12">
                                <input type="number" class="form-control" min="0" value="0" id="noOfPassengers">
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="row" style="padding: 5px;padding-top: 20px">
                            <div class="col-12">No of passengers</div>
                            <div class="col-12">
                                <input type="text" disabled class="form-control" min="0" value="0" id="noOfPassengers">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-5" style="border: 1px solid #b8b8b8;padding-left: 5px">
                <div class="col-sm-12" style="margin-top: 15px;margin-bottom:15px;text-align: center;font-size: 25px">Taxi Details</div>
                <hr style="margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">
                <div class="col-sm-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Pickup From</div>
                <div class="col-sm-6" style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">Pickup From</div>
                <div class="col-sm-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Drop To</div>
                <div class="col-sm-6" style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">Drop To</div>
                <div class="col-sm-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Trip</div>
                <div class="col-sm-6" style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">Trip</div>
                <div class="col-sm-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Pickup Date</div>
                <div class="col-sm-6" style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">Pickup Date</div>
                <div class="col-sm-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Pickup Time</div>
                <div class="col-sm-6" style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">Pickup Time</div>
                <div class="col-sm-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Adults</div>
                <div class="col-sm-6" style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">Adults</div>
                <div class="col-sm-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Children</div>
                <div class="col-sm-6" style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">Children</div>
                <div class="col-sm-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">Infants</div>
                <div class="col-sm-6" style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">Infants</div>
                <div class="col-sm-6" style="padding: 5px;border-bottom: 1px solid #e2e2e2">No of passengers</div>
                <div class="col-sm-6" style="padding: 5px;text-align: right;font-weight: normal;border-bottom: 1px solid #e2e2e2">No of passengers</div>
                <div class="col-sm-6" style="padding: 5px;font-size: 30px">Total Cost</div>
                <div class="col-sm-6" style="padding: 5px;font-size: 30px;text-align: right;font-weight: normal">120</div>
            </div>
        </div>

        <div class="row" style="font-size: 25px;text-align: center;font-weight: bold;margin-top: 90px">
            <div class="col-12">
                <span style="padding: 18px;border-radius: 50px;border: 1px solid #FFCB05">Customer Details</span>
            </div>
        </div>

        <hr style="margin-top: 50px;margin-bottom: 10px;margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">


        <div class="row" style="font-weight: bold;padding-top: 50px">
            <div class="col-sm-6">
                <div class="row" style="padding: 10px">
                    <div class="col-12" style="font-weight: bold">Email</div>
                    <div class="col-12">
                        <input type="text" class="form-control"></div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="row" style="padding: 10px">
                    <div class="col-12" style="font-weight: bold">Contact Number</div>
                    <div class="col-12">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="row" style="padding: 10px">
                    <div class="col-12" style="font-weight: bold">Your Name</div>
                    <div class="col-12">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="row" style="padding: 10px">
                    <div class="col-12" style="font-weight: bold">Your Comment</div>
                    <div class="col-12">
                        <textarea class="form-control" style="height: 150px"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="page-heading">
                <div class="col-sm-12" style="margin-top: 50px">
                    <a class="btn btn-default btn-lg btn-padding"
                       style="background-color: #FFCB05">Submit Reservation</a>
                </div>
            </div>
        </div>
    </div>
</section>

<jsp:include page="../footer.jsp"/>