import asyncio
import os
import edge_tts

SCRIPT_TEXT = """
Good morning, and welcome to this comprehensive practical guide on the visa application and interview process. Applying for an international visa can often feel intimidating, but understanding each stage of the procedure will give you confidence and clarity. Whether you are applying for a tourist visa, a student visa, or an exchange visitor program, the fundamental principles of the consular evaluation remain consistent across embassies worldwide.

Let us begin with the first critical phase: your official documentation. Before you schedule your consular appointment, you must ensure that all your paperwork is complete, accurate, and completely transparent. Your passport must be valid for at least six months beyond your intended period of stay. You must accurately fill out your electronic application form and carefully print the confirmation barcode.

Furthermore, you will need to provide official proof of financial sufficiency. This typically includes recent bank statements, tax records, employment verification letters, or formal sponsorship documents. Remember, the consular officer's primary objective is to verify that you have adequate financial resources to cover your accommodation, travel expenses, and daily needs without working illegally.

Now, let us examine the most crucial part of the process: the in-person consular interview. During the interview, the officer will ask you several direct questions to understand your background and your true intentions.

The first and most common question is: 'What is the primary purpose of your visit?' When answering, be specific and concise. Avoid vague statements. For example, instead of simply saying 'I want to travel,' say: 'I am traveling to attend a two-week technology conference in Chicago, and I also plan to visit museums during the weekend.'

The second frequent question is: 'Who is funding your trip and how will you pay for your expenses?' Clearly state whether you are financing the trip yourself with your personal savings, or if your university, company, or family member is acting as your financial sponsor.

The third, and arguably most decisive question, revolves around your ties to your home country. Under immigration law, every applicant is presumed to have immigrant intent until they prove otherwise. Therefore, you must demonstrate strong social, professional, and economic ties that will compel you to return home after your temporary stay. You can highlight your ongoing university studies, your stable employment contract, property ownership, or your family responsibilities.

To ensure a smooth interview experience, keep these essential communication rules in mind. First, maintain calm, friendly, and respectful eye contact with the officer. Second, listen carefully to each question before speaking, and answer only what is asked. Do not volunteer unnecessary personal details or offer lengthy, rehearsed speeches. Confidence and honesty are the most valuable qualities during a visa evaluation.

In conclusion, thorough preparation, organized documentation, and clear, honest communication are the keys to a successful visa application. Review your travel itinerary, practice your answers out loud, and approach your interview day with a positive mindset. Thank you for your attention, and we wish you the very best of success with your upcoming visa appointment and safe travels ahead.
""".strip()

async def main():
    voice = "en-US-ChristopherNeural"
    output_path = os.path.abspath("d:/ingilizce/visa_interview_guide.mp3")
    
    print(f"Generating studio-quality voice using {voice}...")
    communicate = edge_tts.Communicate(SCRIPT_TEXT, voice=voice, rate="-2%", pitch="+0Hz")
    await communicate.save(output_path)
    
    file_size_kb = os.path.getsize(output_path) / 1024
    print(f"SUCCESS! MP3 saved to: {output_path} ({file_size_kb:.1f} KB)")

if __name__ == "__main__":
    asyncio.run(main())
