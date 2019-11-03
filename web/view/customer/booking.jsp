<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>
<jsp:include page="../carousel.jsp"/>

<section id="about" style="padding-top: 60px;padding-bottom: 80px">
    <div class="container" style="font-size: 16px">
        <div class="row" style="font-size: 25px;text-align: center;font-weight: bold">
            <div class="col-12">
                Customer Details
            </div>
        </div>

        <hr style="margin-top: 50px;margin-bottom: 10px;margin-left: 20px;margin-right: 20px;border: 0.5px solid #b8b8b8">

        <div class="row" style="font-weight: bold;padding-top: 50px">
            <div class="col-sm-6">
                <div class="row" style="padding: 5px">
                    <div class="col-12" style="font-weight: bold">Email</div>
                    <div class="col-12">
                        <input type="text" class="form-control"></div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="row" style="padding: 5px">
                    <div class="col-12" style="font-weight: bold">Contact Number</div>
                    <div class="col-12">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="row" style="padding: 5px">
                    Your Name
                </div>
            </div>
            <div class="col-sm-12">
                <div class="row" style="padding: 5px">
                    <input type="text" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="row" style="padding: 5px">
                    Your Comment
                </div>
            </div>
            <div class="col-sm-12">
                <div class="row" style="padding: 5px">
                    <textarea class="form-control" style="height: 150px"></textarea>
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