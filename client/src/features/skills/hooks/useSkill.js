import { useState, useEffect, useCallback } from "react";
import {
  fetchSkills,
  fetchCategories,
  fetchSkillById,
  removeSkill,
  updateSkill,
  createSkill,
} from "../services/skillServices";

function useSkill({ slug } = {}) {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshSkills = async () => {
    setLoading(true);
    setError(null);

    try {
      const categoriesData = await fetchCategories();
      const skillsData = await fetchSkills();
      setCategories(categoriesData);
      setSkills(skillsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSkill = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchSkillById(slug);
      setSkill(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const deleteSkill = async (skillId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await removeSkill(skillId);

      refreshSkills();
      return {
        success: true,
        unauthorized: false,
        message: response.message,
      };
    } catch (err) {
      const message = err.message;
      const unauthorized = message.toLowerCase().includes("unauthorized");

      setError(message);

      return {
        success: false,
        message,
        unauthorized,
      };
    } finally {
      setLoading(false);
    }
  };

  const editSkill = async (slug, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateSkill(slug, data);

      return {
        success: true,
        unauthorized: false,
        message: response.message,
      };
    } catch (err) {
      const message = err.message;
      const unauthorized = message.toLowerCase().includes("unauthorized");

      setError(message);

      return {
        sucess: false,
        unauthorized,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createSkill(data);

      return {
        success: true,
        unauthorized: false,
        message: response.message,
      };
    } catch (err) {
      const message = err.message;
      const unauthorized = message.toLowerCase().includes("unauthorized");

      setError(message);

      return {
        success: false,
        unauthorized,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkill();
  }, [fetchSkill]);

  useEffect(() => {
    refreshSkills();
  }, []);

  return {
    loading,
    error,
    skills,
    skill,
    categories,
    editSkill,
    addSkill,
    deleteSkill,
  };
}

export default useSkill;
