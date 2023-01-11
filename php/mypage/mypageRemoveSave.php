<?php
    include "../connect/connect.php";
    include "../connect/session.php";
    include "../connect/sessionCheck.php";

    $memberID = $_SESSION['memberID'];
    $youPass = $_POST['youPass'];

    $checkSql = "SELECT * FROM myMember WHERE memberID=$memberID and youPass='$youPass'";
    $checkResult = $connect -> query($checkSql);
    $count = $checkResult -> num_rows;

    if($count) {
        echo "<script>alert('회원 탈퇴 완료되었습니다. 그동안 PHP 블로그를 이용해주셔서 감사합니다.')</script>";
        $sql = "DELETE FROM myMember WHERE memberID=$memberID";
        $connect -> query($sql);

        unset($_SESSION['memberID']);
        unset($_SESSION['youEmail']);
        unset($_SESSION['youName']);
    }
    else {
        echo "<script>alert('비밀번호가 일치하지 않습니다. 탈퇴하실 수 없습니다.')</script>";
    }
?>

<script>
    location.href="../main/main.php";
</script>