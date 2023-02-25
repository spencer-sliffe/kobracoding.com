<?php
if(isset($_POST["submit"])){
// Checking For Blank Fields..
// Check if the "Sender's Email" input field is filled out
$email=$_POST['s_email'];
// Sanitize E-mail Address
$email =filter_var($email, FILTER_SANITIZE_EMAIL);
// Validate E-mail Address
$email= filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$email){
echo "Invalid Sender's Email";
}
else{
$sub_1 = $_POST['s_name'];
$sub_2 = $_POST['siteType'];
$sub_3 = $_POST['needs'];
$subject= $sub_2;
$subject.= " website that needs ";
$subject.= $sub_3;
$subject.= " services";
$message= $_POST['s_descript'];
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From:  ' . $sub_1. ' <' . $email .'>' . " \r\n" .
            'Reply-To: '.  $email . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
// Message lines should not exceed 70 characters (PHP rule), so wrap it
$message = wordwrap($message, 70);
// Send Mail By PHP Mail Function
mail("spencer@kobracoding.com", $subject, $message, $headers);
echo "Success! You will here from us shortly!";
}
}
?>