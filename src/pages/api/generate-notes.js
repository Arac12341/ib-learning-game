export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { topic, level } = req.body;
  
    if (!topic || !level) {
      return res.status(400).json({ message: 'Topic and level are required' });
    }
  
    try {
      console.log('Sending request to OpenAI API for notes generation...');
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `
                You are an expert in IB Economics and your task is to generate the most comprehensive and in-depth study notes possible for either Higher Level (HL) or Standard Level (SL) students. 
                Ensure that the notes adhere strictly to the IB curriculum, covering all required topics, theories, and real-world applications relevant to the students.
  
                **General Guidelines:**
                - The notes should be structured clearly with section headings, sub-section headings, and proper formatting.
                - Provide **detailed explanations** of each concept, ensuring clarity for students at various levels.
                - Always use **real-world examples** where appropriate to illustrate concepts.
                - Include **relevant diagrams** for each major concept and use placeholders where diagrams should be inserted, with descriptions of what the diagrams should show.
                - For **HL students**, include advanced topics, additional depth, and mathematical explanations (where applicable).
  
                **Formatting Instructions:**
                - Use <h2> for main section titles (e.g., "Introduction to Demand").
                - Use <h3> for sub-section titles (e.g., "Factors Affecting Demand").
                - Use <p> for paragraphs with clear, concise explanations.
                - Use <strong> for bold text (e.g., important terms and concepts).
                - Use <ul> and <li> for bullet points to list key items.
                - Use <div class="diagram-placeholder">[Diagram: Insert a detailed diagram of the Demand Curve]</div> for diagram placeholders, with a description of the diagram.
                - Separate major sections with <hr> to improve readability.
  
                **Content Guidelines:**
                - Start with a clear **definition** of the topic and its importance in economics.
                - For each concept, provide detailed sub-sections covering:
                  1. **Key Definitions:** Define all relevant terms (e.g., demand, elasticity, etc.).
                  2. **Laws and Theories:** Explain key economic laws and principles, such as the Law of Demand and Law of Supply.
                  3. **Factors Affecting the Concept:** Break down the internal and external factors affecting each concept (e.g., price, income, consumer preferences, government policy, etc.).
                  4. **Mathematical Explanations (for HL):** Provide mathematical formulas or models relevant to the concept (e.g., price elasticity of demand, income elasticity, etc.).
                  5. **Real-World Applications:** Offer real-world examples from various industries (e.g., tech, agriculture, healthcare) to show how the concept works in practice.
                  6. **Assumptions and Limitations:** Highlight the key assumptions behind each economic theory and any potential limitations or critiques.
                  7. **Graphical Representation:** Describe the diagrams that would represent the concepts visually, such as demand/supply curves, elasticity graphs, etc.
                  8. **Case Studies:** Provide relevant case studies where these concepts have been applied in real-world scenarios, highlighting success/failure stories.
                - Ensure that each major section includes a **conclusion** that summarizes the key points and links the concept to broader economic themes.
  
                **Advanced Topics for HL Students:**
                - For HL students, include discussions on advanced topics such as:
                  - **Cross-Price Elasticity:** Explain how changes in the price of one good affect the demand for another (substitutes and complements).
                  - **Income Elasticity:** Explore how changes in income affect the demand for normal vs. inferior goods.
                  - **Market Dynamics:** Analyze how the interaction of supply and demand influences market equilibrium.
                  - **Government Intervention:** Cover how governments use price controls, taxes, subsidies, and policies to influence demand and market behavior.
  
                **Real-World Applications:** 
                - Provide examples of how the concepts apply in **global markets** such as energy, healthcare, technology, and agriculture.
                - Discuss the effects of government policy (e.g., subsidies, taxes, price ceilings, price floors) and their real-world impact on demand and supply.
                - Highlight how multinational companies, such as Apple, Amazon, and Tesla, adjust their strategies based on economic concepts like elasticity and demand forecasting.
  
                **Final Summary:**
                - Conclude the notes with a summary that ties together the key points, emphasizing why understanding this concept is crucial for both businesses and policymakers.
                - Offer tips for students on how to approach IB exam questions related to this topic.
              `
            },
            {
              role: 'user',
              content: `Generate the most detailed notes possible on "${topic}" for ${level} students, including real-world examples, case studies, advanced concepts, and placeholders for diagrams.`
            },
          ],
          max_tokens: 4000, // Use more tokens to allow for detailed content generation
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('OpenAI API Error:', data); // Log full error object
        return res.status(response.status).json({ message: data.error?.message || 'Error generating notes' });
      }
  
      const generatedNotes = data.choices[0].message.content;
      res.status(200).json({ notes: generatedNotes });
    } catch (error) {
      console.error('Error generating notes:', error); // Log full error
      res.status(500).json({ message: 'Error generating notes', error: error.message });
    }
  }
  