<?php
    include "../connect/connect.php";
    include "../connect/session.php";
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP 사이트 만들기</title>

    <?php include "../include/head.php" ?>
</head>
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
        <section id="banner">
            <h2 class="blind">블로그 소개입니다.</h2>
            <div class="banner__inner container">
                <div class="img">
                    <img src="assets/img/banner_bg01.jpg" alt="배너 이미지">
                </div>
                <div class="desc">
                    어떤 일이라도 <em>노력</em>하고 즐기면 그 결과는 <em>빛</em>을 바란다고 생각합니다.
                    신입의 <em>열정</em>과 <em>도전정신</em>을 깊숙히 새기며 <em>배움</em>에 있어 겸손함을
                    유지하며 세부적인 곳까지 파고드는 멋진 <em>개발자</em>가 되겠습니다.
                </div>
            </div>
        </section>
        <!-- //banner -->

<?php
        $sql = "SELECT * FROM myBlog WHERE blogDelete = 0 ORDER BY blogID DESC LIMIT 8";
        $result = $connect -> query($sql);
?>

        <article class="card__wrap container">
            <div class="card__inner column4">
<!-- 블로그 게시물 8개 출력하기 -->
<?php foreach($result as $blog) { ?>
    <div class="card">
        <figure class="card__header">
            <img src="../assets/blog/<?=$blog['blogImgSrc']?>" alt="<?=$blog['blogTitle']?>">
            <a href="blogView.php?blogID=<?=$blog['blogID']?>" class="go"></a>
            <span class="cate"><?=$blog['blogCategory']?></span>
        </figure>
        <div class="card__contents">
            <div class="title">
                <h3><a href="blogView.php?blogID=<?=$blog['blogID']?>"><?=$blog['blogTitle']?></a></h3>
                <p><?=$blog['blogContents']?></p>
            </div>
            <div class="info">
                <em class="author"><?=$blog['blogAuthor']?></em>
                <span class="time"><?=date('Y-m-d', $blog['blogRegTime'])?></span>
            </div>
        </div>
    </div>
<?php } ?>
            <div class="card__more">
                <a href="../blog/blog.php">더보기</a>
            </div>
        </article>
    </main>
    <!-- //main -->

    <?php include "../include/footer.php" ?>
    <!-- //footer -->
</body>
</html>