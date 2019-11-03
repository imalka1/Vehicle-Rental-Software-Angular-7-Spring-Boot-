<jsp:include page="view/header.jsp"/>
<jsp:include page="view/nav_bar.jsp"/>
<jsp:include page="view/carousel.jsp"/>

<section id="about" style="padding-top: 60px;padding-bottom: 80px">
    <div class="container" style="font-size: 16px">
        <div class="row" style="font-size: 25px;text-align: center;font-weight: bold">
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
        </div>
    </div>
</section>

<script>
    $('#btnBookNow').click(function () {
        document.location.href = "${pageContext.request.contextPath}/view/customer/booking.jsp?placeFromId=" + $('#placeFrom').val() + "&placeToId=" + $('#placeTo').val() + "&noOfPassengers=" + $('#noOfPassengers').val() + "&trip=" + $('#trip').val();
    })
</script>

<jsp:include page="view/footer.jsp"/>
