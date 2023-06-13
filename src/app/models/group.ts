export interface Group {
    id: number | null;
    name: string;
    discordGuildId: number;
    discordNotifyChannelId: number | null;
    ownerUserId: number;
}
