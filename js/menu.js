console.log("hello script!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("dom loaded..");

    fetch("/posts/list.json")
        .then((response) => response.json())
        .then((data) => {
            let beforeMenuName = "";
            let menu;
            for (const post of data) {
                // 메뉴 이름: 연+월
                // 같은 월 글 갯수 세기
                // URL 만들기
                console.log(post.createdAt.substring(0, 7));
                let menuName = post.createdAt.substring(0, 7);

                if (beforeMenuName == menuName) {
                    menu.postCount++;
                } else {
                    // 최초 실행에는 메뉴를 출력하지 않음
                    if (beforeMenuName != "") {
                        // 다른 월별 메뉴를 만나면 기존에 카운팅하던걸 뿌림
                        document.querySelector(
                            "ul.menu"
                        ).innerHTML += `<li><a href="${menu.url}">${menu.name} (${menu.postCount})</a></li>`;
                    }

                    menu = {
                        name: menuName,
                        postCount: 1,
                        url: `/monthly.html?yearMonth=${menuName}`,
                    };
                    beforeMenuName = menuName;
                }
            }

            // 마지막 항목은 출력이 안되므로 마무리로 출력
            document.querySelector(
                "ul.menu"
            ).innerHTML += `<li><a href="${menu.url}">${menu.name} (${menu.postCount})</a></li>`;
        });
});
