import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";


const Wrapper = styled.div`
	padding: 16px;
	width: calc(100% - 32px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
	width: 100%;
	max-width: 720px;
	& > * {
		:not(:last-child) {
			margin-bottom: 16px;
		}
	}
`;

const Button = styled.button`
	background-color: #ffd700; /* 노란색 */
	color: white; /* 글씨 색상 */
	border: none;
	border-radius: 25px; /* 동글동글한 모서리 */
	padding: 10px 20px; /* 위아래, 좌우 여백 */
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #ffc107; /* 호버 시 약간 어두운 노란색 */
	}

	&:active {
		background-color: #ffa000; /* 클릭 시 더 어두운 노란색 */
	}
`;

const MoodContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-bottom: 16px;
`;

const MoodImage = styled.img`
	width: 60px;
	height: 60px;
	cursor: pointer;
	border: ${({ selected }) => (selected ? "2px solid #FFD700" : "none")};
	border-radius: 50%;
	transition: transform 0.2s;

	&:hover {
		transform: scale(1.1);
	}
`;

function UpdatePage() {
    const { id } = useParams(); // URL 파라미터에서 id 가져오기
	const [mood, setMood] = useState("");
	const [content, setContent] = useState("");
	const [date, setDate] = useState(new Date());
	const navigate = useNavigate();

	const contentHandler = (e) => {
		setContent(e.target.value);
	};

	const cancelHandler = () => {
		alert("글 작성을 취소하고 홈으로 이동합니다.");
		navigate("/");
	};

	const submitHandler = async () => {
		const data = {
            id : id,
			mood: mood,
			content: content,
			date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식
		};
        console.log("Sending data:", JSON.stringify(data)); // 데이터 확인
		try {
			const response = await api.put(`/mood/update/${id}`, data); // 수정 요청
	
			console.log("put response", response);
			if (response.status === 204) {
				alert("글 작성 완료하고 홈으로 이동합니다.");
				navigate("/");
			} else {
				alert("데이터 저장 시 문제 발생");
			}
		} catch (error) {
			console.log(error);
		}
	};

    const fetchData = async () => {
        try {
            const response = await api.get(`/mood/select/${id}`); // 기존 데이터 가져오기
            setContent(response.data.content);
            setMood(response.data.mood);
            setDate(new Date(response.data.date)); // 날짜 형식 맞추기
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]); // id가 변경될 때마다 fetchData 호출

	return (
		<Wrapper>
			<Container>
				<label>
					내용:
					<textarea height={480} value={content} onChange={contentHandler} />
				</label>
				<MoodContainer>
					{["happy", "proud", "exciting", "peaceful", "sad"].map((emotion) => (
						<MoodImage
							key={emotion}
							src={`assets/images/${emotion}.png`}
							alt={emotion}
							selected={mood === emotion}
							onClick={() => {
								setMood(emotion); 
								console.log("Selected mood:", emotion);
							}}
						/>
					))}
				</MoodContainer>
				<div>
					<h2>날짜 선택</h2>
					<DatePicker selected={date} onChange={(date) => setDate(date)} />
				</div>
				<Button title="글 작성하기" onClick={submitHandler}>
					글 작성하기
				</Button>
				&nbsp; &nbsp; &nbsp;
				<Button title="글 작성 취소" onClick={cancelHandler}>
					글 작성 취소
				</Button>
			</Container>
		</Wrapper>
	);
}

export default UpdatePage;