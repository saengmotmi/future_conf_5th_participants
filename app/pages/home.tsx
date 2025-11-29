import { useEffect } from "react";
import ParticipantCard from "../entities/participants/card";
import type { Participant } from "../entities/participants/types";
import { ArrivalTimeline } from "../features/arrival-timeline";
import { useParticipantSearch } from "../features/search-participants";
import TopButton from "../features/top-button";

export async function loader() {
  const participants = (await fetch(
    "https://pub-fbb53ae5c5f047428b2e550e1deccc50.r2.dev/full-participants-data.json"
  ).then((res) => res.json())) as Participant[];

  return participants;
}

export default function Home({ loaderData }: { loaderData: Participant[] }) {
  const { searchTerm, setSearchTerm, filteredParticipants } =
    useParticipantSearch(loaderData);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [filteredParticipants]);

  return (
    <div className="container mx-auto py-10 px-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="text-center mb-10">
        <h1 className="inline-block text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text p-2 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
          <span className="block text-2xl">Welcome to</span>
          <span className="block text-5xl">Future Conf 5th</span>
        </h1>
      </div>
      <p className="text-center text-gray-600 mb-8">
        We are the future! 퓨쳐콘 5번째 행사에 오신 것을 환영합니다 🎉
      </p>
      <ArrivalTimeline participants={loaderData} />
      <input
        type="text"
        placeholder="참가자 정보로 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded"
      />
      <div className="space-y-6">
        {filteredParticipants.map((participant, index) => (
          <ParticipantCard key={index} participant={participant} />
        ))}
      </div>
      <TopButton />
    </div>
  );
}
