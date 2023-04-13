import AircraftDetails from "$lib/components/aircraftDetails.svelte";
import type { Aircraft, LatLng } from "$lib/models/aircraft";
import { earthRadius } from "$lib/models/earth";
import { getFlights } from "$lib/services/getFlights";
import { getNewLatLng } from "$lib/utils/maths";
import { get, writable, type Readable } from "svelte/store";
import { dismissCurrentSheet, dismissSheet, getCurrentSheet, showSheet } from "./sheetState";

export interface AircraftPosition {
    aircraft: Aircraft;
    currentPosition: LatLng;
}

interface AircraftsState {
    time: number,
    updateTimeMultiplier: number,
    aircraftPositions: AircraftPosition[],
    searchResults: AircraftPosition[],
    selectedAircraftPosition?: AircraftPosition;
    cameraPosition: LatLng;
}

const defaultState: AircraftsState = {
    time: 0,
    updateTimeMultiplier: 1000,
    aircraftPositions: [],
    searchResults: [],
    cameraPosition: { lat: 0, lng: 0 }
}

const state = writable<AircraftsState>(defaultState);

export const setUpdateTimeMultiplier = (multiplier: number) => state.update(s => ({ ... s, updateTimeMultiplier: multiplier }));

export const initialiseAircrafts = async () => {
    const flights = await getFlights();

	const aircrafts: AircraftPosition[] = flights
            // Filter only filghts with useable flight data
			.filter((flight) => flight.baroAltitude !== null)
			.filter((flight) => flight.velocity !== null)
			.filter((flight) => flight.trueTrack !== null)
			.filter((flight) => flight.longitude !== null)
			.filter((flight) => flight.latitude !== null)
            // only take the first 200 useable flights for performance
			.slice(0, 200)
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
    
    state.update(s => {
        const time = s.time + (deltaSeconds * s.updateTimeMultiplier);

        return {
            ... s,
            time,
            aircraftPositions: s.aircraftPositions.map(position => {
                position.currentPosition = getNewLatLng(
                    time, 
                    earthRadius + position.aircraft.altitude, 
                    position.aircraft.velocity, 
                    position.aircraft.bearing, 
                    position.aircraft.start);

                return position;
            }),

            cameraPosition: rotateCameraToSelectedAircraft(deltaSeconds, s.cameraPosition, s.selectedAircraftPosition)
        }
    });
}

export const searchAircrafts = (searchText: string) => {
    state.update(s => ({
        ... s,
        searchResults: applySearchFilter(searchText, s.aircraftPositions),
    }))
}

export const selectAircraft = (aircraftPosition: AircraftPosition) => { 
    state.update(s => ({ 
        ... s, 
        selectedAircraftPosition: aircraftPosition
    }));

    const currentSheet = getCurrentSheet();

    if (currentSheet?.component.name === AircraftDetails.name) {
        setTimeout(() => dismissSheet(currentSheet), 1000);
    }
    
    showSheet(AircraftDetails, aircraftPosition.aircraft.callSign, { aircraftPosition });
};

const applySearchFilter = (searchText: string, aircraftPositions: AircraftPosition[]) =>
{ 
    try {
        return aircraftPositions.filter(position => position.aircraft.callSign?.match(new RegExp(searchText, "i")));
    }
    catch {
        return [];
    }
}

const rotateCameraToSelectedAircraft = (deltaSeconds: number, cameraPosition: LatLng, selectedAircraftPosition: AircraftPosition | undefined): LatLng => {
    if (!selectedAircraftPosition) return cameraPosition;

    const newPosiition: LatLng = { ... cameraPosition };

    if (newPosiition.lng < selectedAircraftPosition.currentPosition.lng)
    {
        newPosiition.lng += 90 * deltaSeconds;

        if (newPosiition.lng > selectedAircraftPosition.currentPosition.lng)
            newPosiition.lng = selectedAircraftPosition.currentPosition.lng;
    }

    if (newPosiition.lng > selectedAircraftPosition.currentPosition.lng)
    {
        newPosiition.lng -= 90 * deltaSeconds;

        if (newPosiition.lng < selectedAircraftPosition.currentPosition.lng)
            newPosiition.lng = selectedAircraftPosition.currentPosition.lng;
    }

    if (newPosiition.lat < selectedAircraftPosition.currentPosition.lat)
    {
        newPosiition.lat += 90 * deltaSeconds;

        if (newPosiition.lat > selectedAircraftPosition.currentPosition.lat)
            newPosiition.lat = selectedAircraftPosition.currentPosition.lat;
    }

    if (newPosiition.lat > selectedAircraftPosition.currentPosition.lat)
    {
        newPosiition.lat -= 90 * deltaSeconds;

        if (newPosiition.lat < selectedAircraftPosition.currentPosition.lat)
            newPosiition.lat = selectedAircraftPosition.currentPosition.lat;
    }

    return newPosiition;
}

export const aircraftsState: Readable<AircraftsState> = state;