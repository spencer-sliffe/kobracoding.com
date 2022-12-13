<?php

if(isset($_POST['submit']))
      {
          $namename = $_POST['s_name'];
          $email = $_POST['s_email'];
          $description = $_POST['s_description'];
          $uses = $_POST['siteType'];
		  $needs = $_POST['needs'];
		  
		
		  
		  $link = mysqli_connect('spenceronw49089.domaincommysql.com', 'spenceronw', '*password*'); 
		  if (!$link) { 
		      die('Could not connect: ' . mysqli_error()); 
		  } 
		  echo 'Connected successfully'; 
		  $isdb=mysqli_select_db('kobracoding_db1',$link)
		  			or die("Could not select db");
		  
          $query = "INSERT INTO services_table (Name, Email, Description, SiteUses, Services VALUES $namename, $email, $description, $uses, $needs)";
          $result = mysqli_query($link, $query);
		  if($result!="")
		  					{
		  					echo "Inserted successfully";
		  					mysqli_close($link);
		  					}
		  					else
		  					{
		  					echo "Not inserted";
		  					}

						}
?>