const menuData = [
    // 通常パターン
    {
        day: "月曜日",
        breakfast: "トースト、卵、サラダ",
        lunch: "チキンカレー、ライス",
        dinner: "魚のグリル、蒸し野菜、味噌汁",
        calories: 650,
        cost: 500
    },
    {
        day: "火曜日",
        breakfast: "オートミール、バナナ",
        lunch: "鶏肉の唐揚げ、キャベツのサラダ",
        dinner: "豚肉の生姜焼き、ほうれん草のおひたし、ご飯",
        calories: 700,
        cost: 550
    },
    // 鉄分多め
    {
        day: "月曜日",
        breakfast: "ほうれん草と卵のスクランブル、トースト",
        lunch: "鉄分豊富なレバー丼、野菜サラダ",
        dinner: "鰻の蒲焼き、ブロッコリーと小松菜のサラダ",
        calories: 750,
        cost: 800
    },
    {
        day: "火曜日",
        breakfast: "豆腐とわかめの味噌汁、全粒パン",
        lunch: "赤身肉のステーキ、アスパラガスのソテー",
        dinner: "鉄分豊富なカレー（レバー入り）、サラダ",
        calories: 800,
        cost: 850
    },
    // タンパク質多め
    {
        day: "月曜日",
        breakfast: "ギリシャヨーグルト、ナッツ、バナナ",
        lunch: "鶏胸肉のグリル、クスクス、サラダ",
        dinner: "牛ステーキ、焼き野菜",
        calories: 850,
        cost: 950
    },
    {
        day: "火曜日",
        breakfast: "高タンパクな卵白オムレツ（ほうれん草、チーズ）",
        lunch: "シーフードサラダ（エビ、サーモン）",
        dinner: "鶏肉の胸肉炒め、キノコのスープ",
        calories: 800,
        cost: 900
    },
    // ダイエット向き
    {
        day: "月曜日",
        breakfast: "グリーンスムージー（ケール、セロリ、きゅうり）",
        lunch: "鶏肉のグリル、野菜サラダ",
        dinner: "鮭のグリル、蒸し野菜",
        calories: 500,
        cost: 600
    },
    {
        day: "火曜日",
        breakfast: "ヨーグルトとナッツ、フルーツ",
        lunch: "サラダラップ（鶏肉、アボカド、野菜）",
        dinner: "豆腐ステーキ、野菜のピクルス",
        calories: 550,
        cost: 650
    }
];

function updateMenuTable() {
    const tableBody = document.getElementById("menuTableBody");
    let totalCost = 0;
    let totalCalories = 0;

    menuData.forEach(item => {
        const row = document.createElement("tr");

        const dayCell = document.createElement("td");
        dayCell.textContent = item.day;
        row.appendChild(dayCell);

        const breakfastCell = document.createElement("td");
        breakfastCell.textContent = item.breakfast;
        row.appendChild(breakfastCell);

        const lunchCell = document.createElement("td");
        lunchCell.textContent = item.lunch;
        row.appendChild(lunchCell);

        const dinnerCell = document.createElement("td");
        dinnerCell.textContent = item.dinner;
        row.appendChild(dinnerCell);

        const caloriesCell = document.createElement("td");
        caloriesCell.textContent = item.calories + " kcal";
        row.appendChild(caloriesCell);

        const costCell = document.createElement("td");
        costCell.textContent = item.cost + " 円";
        row.appendChild(costCell);

        totalCost += item.cost;
        totalCalories += item.calories;

        tableBody.appendChild(row);
    });

    document.getElementById("weeklyTotalCost").textContent = totalCost;
    document.getElementById("weeklyTotalCalories").textContent = totalCalories;
}

function updateChart(menuData, totalCalories) {
    const labels = menuData.map(item => item.day);
    const calorieData = menuData.map(item => item.calories);
    const costData = menuData.map(item => item.cost);
    const ctx = document.getElementById("nutritionChart").getContext("2d");

    if (window.nutritionChart) {
        window.nutritionChart.destroy(); // destroy previous chart
    }

    window.nutritionChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "カロリー (kcal)",
                    data: calorieData,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1
                },
                {
                    label: "コスト (円)",
                    data: costData,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            if (tooltipItem.datasetIndex === 0) {
                                return tooltipItem.raw + " kcal";
                            } else {
                                return tooltipItem.raw + " 円";
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 500
                    }
                }
            }
        }
    });
}

updateMenuTable();
updateChart(menuData, 0);

