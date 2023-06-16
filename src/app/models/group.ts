export interface Group {
    id: number | null;
    name: string;
    discordGuildId: string;
    discordNotifyChannelId: string | null;
    ownerUserId: number;
}
