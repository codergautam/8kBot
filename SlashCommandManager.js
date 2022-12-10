module.exports = class SlashCommandManager {

    constructor(client) {
        this.client = client;
    };

    async createGlobalCommand(data = {}) {
        return this.client.api.applications(this.client.user.id).commands.post({
            data: data
        });
    }

    async createGuildCommand(guild, data = {}) {
        if (!guild || !guild.id) throw new TypeError('No guild provided!');
        if (!this.client.guilds.cache.has(guild.id)) throw new TypeError('Invalid guild provided!');
        return this.client.api.applications(this.client.user.id).guilds(guild.id).commands.post({
            data: data
        });
    }

    async globalCommandExists(command_id) {
        const commands = await this.client.api.applications(this.client.user.id).commands.get();
        return commands.some(c => c.id === command_id || c.name === command_id);
    }

    async guildCommandExists(guild, command_id) {
        if (!guild || !guild.id) throw new TypeError('No guild provided!');
        if (!this.client.guilds.cache.has(guild.id)) throw new TypeError('Invalid guild provided!');
        const commands = await this.client.api.applications(this.client.user.id).guilds(guild.id).commands.get();
        return commands.some(c => c.id === command_id || c.name === command_id);
    }

    async deleteGlobalCommand(command_id) {
        const commands = await this.client.api.applications(this.client.user.id).commands.get();
        const command = commands.find(c => c.id === command_id || c.name === command_id);
        if (command) command_id = command.id
        else throw new TypeError('Invalid Command');
        return this.client.api.applications(this.client.user.id).commands(command_id).delete();
    }

    async deleteGuildCommand(guild, command_id) {
        if (!guild || !guild.id) throw new TypeError('No guild provided!');
        if (!this.client.guilds.cache.has(guild.id)) throw new TypeError('Invalid guild provided!');
        const commands = await this.client.api.applications(this.client.user.id).guilds(guild.id).commands.get();
        const command = commands.find(c => c.id === command_id || c.name === command_id);
        if (command) command_id = command.id
        else throw new TypeError('Invalid Command');
        return this.client.api.applications(this.client.user.id).guilds(guild.id).commands(command_id).delete();
    }

    async respond(interaction, data = {}) {
        return this.client.api
            .interactions(interaction.id, interaction.token)
            .callback.post({
                data: data
            });
    }

};