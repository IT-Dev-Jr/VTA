<?php
    require_once('php/funciones/regeneracion.php');
    require_once('php/funciones/globales.php');

    if(isset($_SESSION['online']))redirect('php/interface/home.php');
    elseif(isset($_SESSION['ware'])) redirect('php/paperless/ware/home.php');
    elseif(isset($_SESSION['admin']))redirect('php/supervisores/home.php');
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>TiglaT|M</title>
        <link rel="shortcut icon" href="img/favicon.ico">
        <link rel="stylesheet" type="text/css" href="css/index.css?v=1">
        <script type="text/javascript" src='js/jquery-2.1.3.min.js?v=2'></script>
    </head>
    <body>
        <div class="body"></div>
        <div class="grad"></div>
        <div class="header">
            <div>Tigla<span>T|M</span></div>
        </div>
        <br>
        <div class="login">
            <?php
                if(isset($_GET['err']))echo '<div class="error">'.$_GET['err'].'. Uso de gafete obligatorio.</div>';
                else{
                    echo '<div class="error">Uso de gafete obligatorio.</div>';
                }
            ?>
            <form action="php/login/autentificacion.php" method="POST">
                <input type="password" id="code" placeholder="Escanea tu codigo de empleado" name="id_empleado" autofocus required><br>
                <input type="submit" value="Entrada">
            </form>
        </div>
        <script type="text/javascript">
            (function borrar() {
                document.getElementById("code").value= "";
                setTimeout(borrar,600);
            }());

            $(document).ready(function(){
               $('#code').bind("cut copy paste",function(e) { 
                    e.preventDefault();
               });
            });

            $('#code').bind("contextmenu",function(e){ e.preventDefault(); }); 
        </script>
    </body>
</html>