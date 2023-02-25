<?php
if(isset($_POST["submit"])){
// Checking For Blank Fields..
// Check if the "Sender's Email" input field is filled out
$email=$_POST['o_email'];
// Sanitize E-mail Address
$email =filter_var($email, FILTER_SANITIZE_EMAIL);
// Validate E-mail Address
$email= filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$email){
echo "Invalid Sender's Email";
}
else{
$sub_1 = $_POST['o_name'];
$sub_2 = $_POST['age'];
$sub_3 = $_POST['gender'];
$sub_4 = $_POST['position'];
$subject= $sub_2;
$subject.= " ";
$subject.= $sub_3;
$subject.= " applying for a ";
$subject.= $sub_4;
$subject.= " position";
$message= $_POST['p_experience'];
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From:  ' . $sub_1. ' <' . $email .'>' . " \r\n" .
            'Reply-To: '.  $email . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
// Message lines should not exceed 70 characters (PHP rule), so wrap it
$message = wordwrap($message, 70);
// Send Mail By PHP Mail Function
mail("spencer@kobracoding.com", $subject, $message, $headers);
echo "Congratulations!Your application has been sent successfuly!";
}
header("Location: https://kobracoding.com/Home.html");
exit();
}
?>
