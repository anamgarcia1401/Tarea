export class CreateParticipantDto {
  userId: number;
  sessionId: number;
  score: number;
  position: number;
  isWinner: boolean;
}