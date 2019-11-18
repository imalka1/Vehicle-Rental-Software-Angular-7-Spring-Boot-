<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>

<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>

<%
    HttpSession sessionLogin = request.getSession(false);

    if (sessionLogin.getAttribute("accountType") == null) {
%>
<jsp:forward page="../admin/login.jsp"/>
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
        <div class="row" style="margin-top: 70px;font-size: 14px">
            <div class="col-sm-6" style="margin-top: 21px">
                <table width="100%">
                    <thead>
                    <tr>
                        <th width="90%" style="text-align: center">Place</th>
                        <th width="10%" style="text-align: center">Remove</th>
                    </tr>
                    </thead>
                    <tbody style="text-align: center" id="placesBody">

                    </tbody>
                </table>
            </div>
            <div class="col-sm-6">
                <div class="row" style="margin-bottom: 30px">
                    <div class="col-sm-12" style="font-weight: bold">
                        Place
                    </div>
                    <div class="col-sm-12">
                        <input type="hidden" id="placeId" value="0">
                        <input type="text" class="form-control" placeholder="Enter Place" id="placeName">
                    </div>
                    <div class="col-sm-6 text-center" style="margin-top: 70px">
                        <button class="btn btn-default" style="background-color: #FFCB05;padding: 10px;font-size: 14px" id="newPlace">
                            New Place
                        </button>
                    </div>
                    <div class="col-sm-6 text-center" style="margin-top: 70px">
                        <button class="btn btn-default" style="background-color: #FFCB05;padding: 10px;font-size: 14px" id="updatePlace">
                            Update Place
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="${pageContext.request.contextPath}/controller/admin/placeSettingsController.js"></script>

<jsp:include page="../footer.jsp"/>