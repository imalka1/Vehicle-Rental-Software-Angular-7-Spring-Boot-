<jsp:include page="view/header.jsp"/>
<jsp:include page="view/nav_bar.jsp"/>
<jsp:include page="view/carousel.jsp"/>

<%--<div class="row" style="font-size: 25px;color: #86867f">--%>
<%--<div class="col-sm-12" style="font-size: 25px" *ngIf="selectedCategory=='Airport'">--%>
<%--Pickup Details (Airport)--%>
<%--</div>--%>
<%--<div class="col-sm-12" style="font-size: 25px" *ngIf="selectedCategory=='Disneyland'">--%>
<%--Pickup Details (Disneyland)--%>
<%--</div>--%>
<%--<div class="col-sm-12" style="font-size: 25px" *ngIf="selectedCategory=='Private'">--%>
<%--Pickup Details (Private)--%>
<%--</div>--%>
<%--</div>--%>

<section id="about" style="padding-top: 60px;padding-bottom: 80px">
    <div class="container" style="font-size: 16px">
        <div class="row" style="font-size: 25px;text-align: center;font-weight: bold">
            <div class="col-12">
                Book Your Taxi Now
            </div>
        </div>

        <hr style="margin-top: 50px;margin-bottom: 10px;margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">

        <div class="row" style="font-weight: bold;padding-top: 50px">
            <div class="col-4" style="padding: 5px">
                Pickup From
            </div>

            <div class="col-4" style="padding: 5px">
                Drop To
            </div>

            <div class="col-2" style="padding: 5px">
                No of passengers
            </div>

            <div class="col-2" style="padding: 5px">
                Trip
            </div>
        </div>

        <div class="row">
            <div class="col-4" style="padding: 5px">
                <select class="form-control">
                    <option>

                    </option>
                </select>
            </div>

            <div class="col-4" style="padding: 5px">
                <select class="form-control">
                    <option>

                    </option>
                </select>
            </div>

            <div class="col-2" style="padding: 5px">
                <input type="number" class="form-control" min="1" value="1">
            </div>

            <div class="col-2" style="padding: 5px">
                <select name="" class="form-control">
                    <option value="">One way</option>
                    <option value="">Round trip</option>
                </select>
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
