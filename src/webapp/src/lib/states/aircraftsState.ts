import type { Aircraft } from "$lib/models/aircraft";
import { getFlights } from "$lib/services/getFlights";
import { writable, type Readable } from "svelte/store";

interface AircraftsState {
    updateTimeMultiplier: number,
    aircrafts: Aircraft[],
    searchResults: Aircraft[]
}

const defaultState: AircraftsState = {
    updateTimeMultiplier: 1,
    aircrafts: [],
    searchResults: [],
}

const state = writable<AircraftsState>(defaultState);

export const setUpdateTimeMultiplier = (multiplier: number) => state.update(s => ({ ... s, updateTimeMultiplier: multiplier }));

export const initialiseAircrafts = async () => {
    const flights = await getFlights();

	const aircrafts = flights
			.filter((flight) => flight.baroAltitude)
			.filter((flight) => flight.velocity)
			.filter((flight) => flight.trueTrack)
			.filter((flight) => flight.longitude)
			.filter((flight) => flight.latitude)
			.slice(0, 100)
			.map((flight) => ({
				id: flight.icao24,
				callSign: flight.callsign,
				altitude: flight.baroAltitude!,
				velocity: flight.velocity!,
				bearing: flight.trueTrack!,
				distanceTraveled: 0,
				start: {
					lng: flight.longitude!,
					lat: flight.latitude!
				}
			}));

    state.update(s => ({ ... s, aircrafts }));
}

export const updateAircrafts = (deltaSeconds: number) => {
    state.update(s => ({
        ... s,
        aircrafts: s.aircrafts.map(aircraft => {
            return {
                ...aircraft,
                distanceTraveled: aircraft.distanceTraveled + aircraft.velocity * s.updateTimeMultiplier * deltaSeconds
            };
        })
    }));
}

export const searchAircrafts = (searchText: string) => {
    state.update(s => ({
        ... s,
        searchResults: applySearchFilter(searchText, s.aircrafts)
    }))
} 

const applySearchFilter = (searchText: string, aircrafts: Aircraft[]) =>
{ 
    try {
        return aircrafts.filter(aircraft => aircraft.callSign?.match(new RegExp(searchText, "i")));
    }
    catch {
        return [];
    }
}

export const aircraftsState: Readable<AircraftsState> = state;