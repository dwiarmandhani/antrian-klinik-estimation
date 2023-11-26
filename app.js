class Doctor {
  constructor(name, consultationTime) {
    this.name = name;
    this.consultationTime = consultationTime; // Average consultation time for this doctor
  }
}

function calculateWaitingTime(doctors, patientPosition) {
  const totalConsultationTime = doctors.reduce((total, doctor) => total + doctor.consultationTime, 0);
  const patientsPerDoctor = Math.floor(patientPosition / doctors.length);
  const remainingPatients = patientPosition % doctors.length;

  let waitingTime = 0;

  for (let i = 0; i < doctors.length; i++) {
      const patientsForThisDoctor = i < remainingPatients ? patientsPerDoctor + 1 : patientsPerDoctor;
      const doctorTime = patientsForThisDoctor * doctors[i].consultationTime;
      waitingTime = Math.max(waitingTime, doctorTime);
  }

  waitingTime += totalConsultationTime;

  return waitingTime;
}

function calculateEstimatedWaitingTime() {
  const doctorCount = parseInt(document.getElementById('doctorCount').value);
  let doctors = [];

  // Generate Doctor objects based on user input
  for (let i = 0; i < doctorCount; i++) {
      const doctorName = `Doctor ${i + 1}`;
      const consultationTime = parseInt(prompt(`Enter consultation time for ${doctorName}:`));
      doctors.push(new Doctor(doctorName, consultationTime));
  }

  const patientPosition = parseInt(document.getElementById('patientPosition').value);

  const estimatedWaitingTime = calculateWaitingTime(doctors, patientPosition);
  document.getElementById('result').innerText = `Estimated waiting time for the patient: ${estimatedWaitingTime} minutes`;
}
