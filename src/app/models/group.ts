export interface Group {
    id: number | null;
    name: string;
    discordGuidId: number;
    discordNotifyChannelId: number | null;
    ownerUserId: number;
}
