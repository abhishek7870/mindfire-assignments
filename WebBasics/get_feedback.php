<?php
 if ( isset( $_GET['submit'] ) ) {
    $query = $_GET['query']; 
    echo '<h3>Form GET Method</h3>';
    echo '<h1 style="color:red">You Searching for this </h1>'.$query; exit;
  }
?>