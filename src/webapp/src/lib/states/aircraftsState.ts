import type { Aircraft, LatLng } from "$lib/models/aircraft";
import { earthRadius } from "$lib/models/earth";
import { getFlights } from "$lib/services/getFlights";
import { toRadians } from "$lib/utils/maths";
import { get, writable, type Readable } from "svelte/store";

export interface AircraftPosition {
    aircraft: Aircraft;
    distanceTraveled: number;
    currentPosition: LatLng;
}

interface AircraftsState {
    updateTimeMultiplier: number,
    aircraftPositions: AircraftPosition[],
    searchResults: AircraftPosition[]
}

const defaultState: AircraftsState = {
    updateTimeMultiplier: 1,
    aircraftPositions: [],
    searchResults: [],
}

const state = writable<AircraftsState>(defaultState);

export const setUpdateTimeMultiplier = (multiplier: number) => state.update(s => ({ ... s, updateTimeMultiplier: multiplier }));

export const initialiseAircrafts = async () => {
    const flights = await getFlights();

	const aircrafts: AircraftPosition[] = flights
			.filter((flight) => flight.baroAltitude)
			.filter((flight) => flight.velocity)
			.filter((flight) => flight.trueTrack)
			.filter((flight) => flight.longitude)
			.filter((flight) => flight.latitude)
			.slice(0, 1)
			.map((flight) => ({
                currentPosition: {
                    lat: flight.latitude!,
                    lng: flight.longitude!,
                },
                distanceTraveled: 0,
                aircraft: {
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
                }
			}));

    state.update(s => ({ ... s, aircraftPositions: aircrafts }));
}

export const updateAircrafts = (deltaSeconds: number) => {
    
    state.update(s => ({
        ... s,
        aircraftPositions: s.aircraftPositions.map(position => {
            const distance = position.distanceTraveled + position.aircraft.velocity * s.updateTimeMultiplier * deltaSeconds;
            position.distanceTraveled = distance;
            
            const bearingRadius = toRadians(position.aircraft.bearing);
            const start = position.aircraft.start;

            const newlat = Math.asin(Math.sin(start.lat)* Math.cos(distance/earthRadius) + Math.cos(start.lat)* Math.sin(distance/earthRadius)* Math.cos(bearingRadius));
            const newlng = start.lng + Math.atan2(
                Math.sin(bearingRadius) * Math.sin(distance/earthRadius)*Math.cos(start.lat), 
                Math.cos(distance/earthRadius) - Math.sin(start.lat) * Math.sin(newlat));

            position.currentPosition = { lat: newlat, lng: newlng };

            return position;
        })
    }));
}

export const searchAircrafts = (searchText: string) => {
    state.update(s => ({
        ... s,
        searchResults: applySearchFilter(searchText, s.aircraftPositions)
    }))
} 

const applySearchFilter = (searchText: string, aircraftPositions: AircraftPosition[]) =>
{ 
    try {
        return aircraftPositions.filter(position => position.aircraft.callSign?.match(new RegExp(searchText, "i")));
    }
    catch {
        return [];
    }
}

export const aircraftsState: Readable<AircraftsState> = state;