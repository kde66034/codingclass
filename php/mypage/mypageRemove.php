<?php
    include "../connect/connect.php";
    include "../connect/session.php";
    include "../connect/sessionCheck.php";
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원 탈퇴</title>

    <?php include "../include/head.php" ?>
</head>
<body>
<body>
    <div id="skip">
        <a href="#header">헤더 영역 바로가기</a>
        <a href="#main">컨텐츠 영역 바로가기</a>
        <a href="#footer">푸터 영역 바로가기</a>
    </div>
    <!-- //skip -->

    <?php include "../include/header.php" ?>
    <!-- //header -->

    <main id="main">
        <section id="join" class="container section">
            <h2>정말 탈퇴하시겠습니까?</h2>
            <p>탈퇴하셔도 작성하셨던 게시글과 댓글은 그대로 유지됩니다.</p>
            <div class="join__inner">
                <div class="join__info">
                    <div class="img">
                        <img src="../assets/img/imgDefault.svg" alt="s">
                    </div>
                    <div class="intro">
                        탈퇴하시려면 비밀번호를 입력해주세요.
                    </div>
                    <div class="info">
                        <form action="mypageRemoveSave.php" name="remove" method="post">
                            <fieldset>
                                <legend>회원 탈퇴</legend>
                                <div class="removeAccount">
                                    <div>
                                        <label for="youPass">비밀번호 입력</label>
                                        <input type="password" id="youPass" name="youPass" placeholder="비밀번호를 입력해주세요!" maxlength="20" autocomplete="off" required>
                                    </div>
                                </div>
                                <div class="btn">
                                    <a href="mypage.php">돌아가기</a>   
                                    <a href="mypageRemove.php"> <button>탈퇴하기</button> </a>   
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    
                   
                </div>
            </div>
        </section>
    </main>
    <!-- //main -->

    <?php include "../include/footer.php" ?>
    <!-- //footer -->
</body>
</html>